export const useDiscussionComment = () => {
  const newComment = async (discussionId: string, content: string) => {
    // Implement the logic to post a new comment to the discussion with the given ID
    // This might involve making an API call to your backend server
  }

  return {
    newComment,
  };
}