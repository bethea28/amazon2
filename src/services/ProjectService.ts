import axiosInstance from '../apiConfig'
import ProjectData from "../types/Project"

const createProject = async (data: ProjectData) => {
  try {
    return await axiosInstance.post<ProjectData>('/projects', data,);
  } catch (error) {
    throw error;
  }
};

const getProject = async (projectId: any) => {
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

const getProjectsByUser = async (userId: string) => {
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

const ProjectService = {
  createProject,
  getProject,
  getAllProjects,
  getProjectsByUser,
  getProjectsByCategory,
  updateProject,
  removeProject,
  findProjectByName
};

export default ProjectService;