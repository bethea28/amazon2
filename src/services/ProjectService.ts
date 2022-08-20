import axiosInstance from '../apiConfig'
import ProjectData from "../types/Project"
import UserData from '../types/User';

const createProject = async (data: ProjectData) => {
  try {
    return await axiosInstance.post<ProjectData>('/projects', data,);
  } catch (error) {
    throw error;
  }
};

const getProjectById = async (projectId: any) => {
  try {
    return await axiosInstance.get<ProjectData>(`/projects/${projectId}`);
  } catch (error) {
    throw error;
  }
};

const getAllProjects = async () => {
  try {
    return await axiosInstance.get<ProjectData>('/projects');
  } catch (error) {
    throw error;
  }
};

const updateProject = async (projectId: any, data: ProjectData) => {
  try {
    return await axiosInstance.put<any>(`/projects/${projectId}`, data);
  } catch (error) {
    throw error;
  }
};

const removeProject = async (projectId: any) => {
  try {
    return await axiosInstance.delete<any>(`/projects/${projectId}`);
  } catch (error) {
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
    return await axiosInstance.patch<ProjectData>(`projects/${projectId}/likes`);
  } catch (error) {
    throw error;
  }
};

const ProjectService = {
  createProject,
  getProjectById,
  getAllProjects,
  updateProject,
  removeProject,
  findProjectByName,
  addLike
};

export default ProjectService;