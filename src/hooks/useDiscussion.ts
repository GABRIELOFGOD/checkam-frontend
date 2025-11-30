import { toast } from "sonner";

export const useDiscussion = () => {
  const like = async (id: string) => {
    try {
      const request = await fetch(`/api/discussion?id=${id}`, {
        method: "PUT",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await request.json();
      // Optionally return data to caller for UI updates
      return data;
    } catch (error: unknown) {
      console.log("Error", error);
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  // const unLike = (id: string) => {};

  const comment = async (discussionId: string, message: string) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/discussion/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ discussionId, message }),
      });
      return await res.json();
    } catch (error) {
      console.error("Error posting comment", error);
    }
  };

  const replyComment = async (
    discussionId: string,
    parentId: string,
    message: string
  ) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/discussion/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ discussionId, parentId, message }),
      });
      return await res.json();
    } catch (error) {
      console.error("Error posting reply", error);
    }
  };

  return {
    like,
    comment,
    replyComment,
  };
};
