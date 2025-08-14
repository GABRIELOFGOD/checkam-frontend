"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useUser } from "@/providers/user-provider";
import { isError } from "@/lib/helper";

const FeedbackForm = () => {
  const [about, setAbout] = useState("");
  const [urgency, setUrgency] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token || !user) {
      toast.warning("You must be logged in to submit feedback");
      window.location.assign("/login?back=/feedback");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ about, urgency, feedback }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit feedback");
      }

      toast.success("Feedback submitted successfully!");
      setAbout("");
      setUrgency("");
      setFeedback("");
    } catch (error: unknown) {
      if (isError(error)) {
        toast.error(error.message);
        console.error("Login failed", error.message);
      } else {
        console.error("Unknown error", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setAbout("");
    setUrgency("");
    setFeedback("");
  };

  return (
    <div className="flex flex-col gap-5 w-full md:w-[700px] mx-auto">
      <div>
        <h1 className="text-2xl font-bold">Feedback zone</h1>
        <p className="text-gray-500">
          We value your feedback. Please let us know your thoughts.
        </p>
      </div>

      <div className="p-3 shadow-sm rounded-md border border-border">
        <div className="mb-5">
          <h2 className="text-lg font-bold text-center">Fill form appropriately</h2>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="about" className="font-semibold">
                What is your feedback about?
              </Label>
              <Select value={about} onValueChange={(value) => setAbout(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Please select one" />
                </SelectTrigger>
                <SelectContent id="about">
                  <SelectItem value="legislator">Legislator</SelectItem>
                  <SelectItem value="member">A member</SelectItem>
                  <SelectItem value="glitch">Glitch</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="urgency" className="font-semibold">
                How urgent is your feedback?
              </Label>
              <Select value={urgency} onValueChange={(value) => setUrgency(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Please select one" />
                </SelectTrigger>
                <SelectContent id="urgency">
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="very-urgent">Very urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full">
            <Label htmlFor="feedback" className="font-semibold">
              Your Feedback
            </Label>
            <Textarea
              placeholder="Please enter your feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full max-h-[300px]"
            />
          </div>

          <div className="flex gap-5 w-full">
            <Button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit feedback"}
            </Button>
            <Button type="button" variant="outline" onClick={handleReset}>
              Reset form
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default FeedbackForm;
