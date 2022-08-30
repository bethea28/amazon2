import axiosInstance from "../apiConfig";
import CommentData from "../types/Comment";
import { getTheCookie } from "../utils/cookies";

const saveComment = async (data: CommentData) => {
  try {
    return await axiosInstance.post<CommentData>('/comments', data, {
      headers: {
        Authorization: `Bearer ${getTheCookie("accessToken")}`
      }
  })} catch (error) {
    throw error;
  }
};

const updateComment = async (commentId: string, data: CommentData) => {
  try {
    return await axiosInstance.put<CommentData>(`/comments/${commentId}`, data, {
      headers: {
        Authorization: `Bearer ${getTheCookie("accessToken")}`
      }
  })} catch (error) {
    throw error;
  }
};

const deleteComment = async (commentId: string) => {
  try {
    return await axiosInstance.delete<CommentData>(`/comments/${commentId}`, {
      headers: {
        Authorization: `Bearer ${getTheCookie("accessToken")}`
      }
  })} catch (error) {
    throw error;
  }
};

const getCommentById = async (commentId: string) => {
  try {
    return await axiosInstance.get<CommentData>(`/comments/${commentId}`);
  } catch (error) {
    throw error;
  }
};

const getCommentsByProjectId = async (projectId: string | undefined) => {
  try {
    return await axiosInstance.get<Array<CommentData>>(`/comments/projects/${projectId}`);
  } catch (error) {
    throw error;
  }
};

const CommentService = {
  saveComment,
  updateComment,
  deleteComment,
  getCommentById,
  getCommentsByProjectId,
}

export default CommentService;