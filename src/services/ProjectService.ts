import axiosInstance from '../apiConfig'
import ProjectData from "../types/Project"
import { getTheCookie } from "../utils/cookies";

const createProject = async (data: ProjectData) => {
  try {
    return await axiosInstance.post<ProjectData>('/projects', data, {
      headers: {
        Authorization: `Bearer ${getTheCookie("accessToken")}`
      }
  })} catch (error) {
    throw error;
  }
};

const getProjectById = async (projectId: string) => {
  try {
    return await axiosInstance.get<ProjectData>(`/projects/${projectId}`);
  } catch (error) {
    throw error;
  }
};

const getAllProjects = async () => {
  try {
    return await axiosInstance.get<Array<ProjectData>>('/projects');
  } catch (error) {
    throw error;
  }
};

const getProjectsByUser = async (userId: string | undefined) => {
  try {
    return await axiosInstance.get<Array<ProjectData>>(`/projects/users/${userId}`);
  } catch (error) {
    throw error;
  }
};

const getProjectsByCategory = async (projectCategory: string | undefined) => {
  try {
    return await axiosInstance.get<Array<ProjectData>>(`/projects/categories/${projectCategory}`);
  } catch (error) {
    throw error;
  }
};


const updateProject = async (projectId: string, data: ProjectData) => {
  try {
    return await axiosInstance.put<any>(`/projects/${projectId}`, data, {
      headers: {
        Authorization: `Bearer ${getTheCookie("accessToken")}`
      }
  })} catch (error) {
    throw error;
  }
};

const removeProject = async (projectId: any) => {
  try {
    return await axiosInstance.delete<any>(`/projects/${projectId}`, {
      headers: {
        Authorization: `Bearer ${getTheCookie("accessToken")}`
      }
  })} catch (error) {
    throw error;
  }
};

const findProjectByName = async (name: string) => {
  try {
    return await axiosInstance.get<Array<ProjectData>>(`/projects?name=${name}`);
  } catch (error) {
    throw error;
  }
};

const addLike = async (projectId: string) => {
  try {
    return await axiosInstance.patch<ProjectData>(`projects/${projectId}/likes`, {}, {
      headers: {
        Authorization: `Bearer ${getTheCookie("accessToken")}`
      }      
    });
  } catch (error) {
    throw error;
  }
};

const ProjectService = {
  createProject,
  getProjectById,
  getAllProjects,
  getProjectsByUser,
  getProjectsByCategory,
  updateProject,
  removeProject,
  findProjectByName,
  addLike
};

export default ProjectService;