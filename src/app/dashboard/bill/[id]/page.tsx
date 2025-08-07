import { notFound } from 'next/navigation'
import { IBill } from '@/models/bill'
import AdminSingleBillClient from '@/components/layouts/dashboard/bill/admin-single-bill'

async function getBill(id: string): Promise<IBill | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/bill?id=${id}`, {
      cache: 'no-store' // Ensure fresh data
    })
    
    if (!res.ok) {
      return null
    }
    
    return res.json()
  } catch (error) {
    console.error('Error fetching bill:', error)
    return null
  }
}

export default async function AdminSingleBillPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const bill = await getBill(id);

  if (!bill) {
    notFound()
  }

  return <AdminSingleBillClient bill={bill} />
}
