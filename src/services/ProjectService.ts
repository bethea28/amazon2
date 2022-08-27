import axiosInstance from '../apiConfig'
import { ProjectMilestonesData } from '../types/Milestone';
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

const getTrendingProjectsBasedOnLikeCount = async () => {
  try {
    return await axiosInstance.get<Array<ProjectData>>('projects/trending/likeCount');
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
    return await axiosInstance.put<ProjectData>(`/projects/${projectId}`, data, {
      headers: {
        Authorization: `Bearer ${getTheCookie("accessToken")}`
      }
  })} catch (error) {
    throw error;
  }
};

const updateProjectMilestone = async (projectId: any, data: ProjectMilestonesData) => {
  try {
    return await axiosInstance.patch<any>(`/projects/${projectId}/milestones`, data);
  } catch(error){
    throw error;
  }
}

const removeProject = async (projectId: string) => {
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
    return await axiosInstance.patch<ProjectData>(`/projects/${projectId}/likes`);
  } catch (error) {
    throw error;
  }
};

//*********Call to GET Newest Projects**** */
const getNewProjects = async () => {
  try {
    return await axiosInstance.get<Array<ProjectData>>('/projects/newest');
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
  updateProjectMilestone,
  addLike,
  getNewProjects,
  getTrendingProjectsBasedOnLikeCount
};

export default ProjectService;