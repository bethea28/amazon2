import axiosInstance from "../apiConfig";
import CommentData from "../types/Comment";

export default async function getProject(projectId: string) {
  return await axiosInstance.get<CommentData>(
    `/projects/${projectId}/comments`
  );
}

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
  {
    projectId,
    commentId,
    userId,
    userName,
    commentText,
    creationDate,
  }: CommentData
) => {
  try {
    const { data } = await axiosInstance.post(
      "/projects/${projectId}/comments",
      {
        projectId,
        commentId,
        userId,
        userName,
        commentText,
        creationDate,
      }
    );
    return data;
  } catch (err) {
    throw err;
  }
};

export const updateComment = async (
  // token,
  { commentId, commentText }: CommentData
) => {
  try {
    const { data } = await axiosInstance.patch(
      "/projects/${projectId}/${commentId}",
      {
        commentId,
        commentText,
      }
    );
    return data;
  } catch (err) {
    console.error("Error at updateComment", err);
  }
};

export const deleteComment = async (/*token,*/ commentId: string) => {
  try {
    const { data } = await axiosInstance.delete(
      "/projects/${projectId}/${commentId}"
    );
    return data;
  } catch (err) {
    console.error("Error at deleteComment", err);
  }
};

export const CommentService = { getProject };
