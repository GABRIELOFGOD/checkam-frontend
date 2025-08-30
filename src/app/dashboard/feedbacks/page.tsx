"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { isError } from "@/lib/helper";
import { toast } from "sonner";
import Loading from "@/components/general-loader";

interface FeedbackType {
  _id: string;
  name?: string;
  email?: string;
  topic: "suggestion" | "complaint" | "question";
  message: string;
  status?: string;
  createdAt: string;
}

const AdminFeedBack = () => {
  const [feedbacks, setFeedbacks] = useState<FeedbackType[]>([]);
  const [loading, setLoading] = useState(true);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/feedback", {
        headers: { authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch feedback");
      setFeedbacks(data);
    } catch (error: unknown) {
      if (isError(error)) {
        toast.error(error.message);
      } else {
        console.error("Unknown error", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteFeedback = async (id: string) => {
    if (!confirm("Are you sure you want to delete this feedback?")) return;
    try {
      const res = await fetch(`/api/feedback?id=${id}`, {
        method: "DELETE",
        headers: { authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete");
      toast.success("Feedback deleted");
      fetchFeedbacks();
    } catch (error: unknown) {
      if (isError(error)) {
        toast.error(error.message);
      } else {
        console.error("Unknown error", error);
      }
    }
  };

  const markAsResolved = async (id: string) => {
    try {
      const res = await fetch(`/api/feedback`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, status: "resolved" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update");
      toast.success("Marked as resolved");
      fetchFeedbacks();
    } catch (error: unknown) {
      if (isError(error)) {
        toast.error(error.message);
      } else {
        console.error("Unknown error", error);
      }
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <div className="flex flex-col gap-10 p-5">
      <h1 className="text-2xl font-bold">Feedback Management</h1>

      {loading ? (
        <Loading />
      ) : feedbacks.length === 0 ? (
        <p>No feedback available.</p>
      ) : (
        <div className="overflow-x-auto border rounded-md">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border">Topic</th>
                <th className="p-3 border">Message</th>
                <th className="p-3 border">User</th>
                <th className="p-3 border">Date</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((item) => (
                <tr key={item._id} className="border-b hover:bg-gray-50">
                  {/* Topic */}
                  <td className="p-3 border capitalize">{item.topic}</td>

                  {/* Message */}
                  <td className="p-3 border">{item.message}</td>

                  {/* User */}
                  <td className="p-3 border">
                    {item.name || "Anonymous"} <br />
                    <small className="text-gray-500">{item.email}</small>
                  </td>

                  {/* Date */}
                  <td className="p-3 border">
                    {new Date(item.createdAt).toLocaleString()}
                  </td>

                  {/* Status */}
                  <td className="p-3 border">
                    <Badge
                      variant={item.status === "resolved" ? "secondary" : "outline"}
                    >
                      {item.status || "pending"}
                    </Badge>
                  </td>

                  {/* Actions */}
                  <td className="p-3 border flex gap-2">
                    {item.status !== "resolved" && (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => markAsResolved(item._id)}
                      >
                        Resolve
                      </Button>
                    )}
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteFeedback(item._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminFeedBack;
