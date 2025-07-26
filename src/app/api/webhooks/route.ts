// pages/api/webhooks/clerk.ts (for Next.js API route)
import type { NextApiRequest, NextApiResponse } from 'next';
import { Webhook } from 'svix';
import { clerkClient } from '@clerk/nextjs/server';

// Define the structure for the user.created event data
// This is a simplified version; refer to Clerk's webhook documentation for the full payload structure.
interface UserCreatedEventData {
  id: string;
  email_addresses: Array<{
    id: string;
    email_address: string;
    // ... other email properties
  }>;
  first_name: string | null;
  last_name: string | null;
  // ... other user properties
  unsafe_metadata: Record<string, unknown>;
  public_metadata: Record<string, unknown>;
  private_metadata: Record<string, unknown>;
}

const WEBHOOK_SECRET: string = process.env.CLERK_WEBHOOK_SECRET || '';

// If the secret is not set, we should prevent the handler from running
if (!WEBHOOK_SECRET) {
  console.error('CLERK_WEBHOOK_SECRET is not set in environment variables.');
  // In a real application, you might throw an error or handle this more gracefully
  // to prevent the server from starting or processing invalid webhooks.
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Get the headers and payload from the request
  const payload = JSON.stringify(req.body);
  // Convert headers to a plain object with string values
  const svixHeaders: Record<string, string> = {
    'svix-id': req.headers['svix-id'] as string ?? '',
    'svix-timestamp': req.headers['svix-timestamp'] as string ?? '',
    'svix-signature': req.headers['svix-signature'] as string ?? '',
  };

  // Create a new Svix instance with your secret
  const wh = new Webhook(WEBHOOK_SECRET);

  let msg: unknown;
  try {
    // Verify the webhook signature
    msg = wh.verify(payload, svixHeaders);
  } catch (err) { // Use 'any' for the catch error type if you're not sure of its structure
    console.error('Webhook verification failed:', err);
    return res.status(400).json({ error: 'Webhook verification failed' });
  }

  // Narrow the type of msg after verification
  if (
    typeof msg !== 'object' ||
    msg === null ||
    !('type' in msg) ||
    !('data' in msg)
  ) {
    return res.status(400).json({ error: 'Invalid webhook payload structure' });
  }

  // Parse the event type and data
  const eventType = (msg as { type: string; data: unknown }).type;

  if (eventType === 'user.created') {
    // Cast the data to our specific interface for type safety
    const user = msg.data as UserCreatedEventData;
    const userId = user.id;

    console.log(`New user created: ${userId}`);

    try {
      // Update the user's public metadata with the default role
      const client = await clerkClient();
      await client.users.updateUserMetadata(userId, {
        publicMetadata: {
          role: 'user', // Your default role
        },
      });
      console.log(`Assigned default 'user' role to ${userId}`);
    } catch (updateError) {
      console.error(`Failed to update metadata for user ${userId}:`, updateError);
      return res.status(500).json({ error: 'Failed to update user metadata' });
    }
  } else {
    console.log(`Received unhandled event type: ${eventType}`);
  }

  return res.status(200).json({ success: true });
}
