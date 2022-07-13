import axiosInstance from "../../../apiConfig";

type commentData = {
  userId: string;
  projectId: string;
  commentId: string;
  headline: string;
  username: string;
  description: string;
};

export const fetchComments = async () => {
  try {
    const { data: comments } = await axiosInstance.get("/comments");
    return comments;
  } catch (err) {
    console.error("Error at fetchComments", err);
  }
};

export const fetchCommentsById = async (id: string) => {
  try {
    const { data: comment } = await axiosInstance.get(
      "/comments/commentId/${id}"
    );

    return comment;
  } catch (error) {
    throw error;
  }
};

export const createComment = async (
  token: string,
  { userId, projectId, headline, description }: commentData
) => {
  try {
    const { data } = await axiosInstance.post("/comments", {
      userId,
      projectId,
      headline,
      description,
    });
    return data;
  } catch (err) {
    throw err;
  }
};

export const updateComment = async (
  // token,
  { commentId, headline, description }: commentData
) => {
  try {
    const { data } = await axiosInstance.patch("/comments/${commentId}", {
      headline,
      description,
    });
    return data;
  } catch (err) {
    console.error("Error at updateComment", err);
  }
};

export const deleteComment = async (/*token,*/ commentId: string) => {
  try {
    const { data } = await axiosInstance.delete("/comments/${commentId}");
    return data;
  } catch (err) {
    console.error("Error at deleteComment", err);
  }
};

export default axiosInstance;
