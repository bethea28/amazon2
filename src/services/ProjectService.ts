import axiosInstance from '../apiConfig'
import ProjectData from "../types/Project"

const getAll = () => {
  return axiosInstance.get<Array<ProjectData>>("/projects");
};
const get = (id: any) => {
  return axiosInstance.get<ProjectData>(`/projects/${id}`);
};
const create = (data: ProjectData) => {
  return axiosInstance.post<ProjectData>("/projects", data);
};
const update = (id: any, data: ProjectData) => {
  return axiosInstance.put<any>(`/projects/${id}`, data);
};
const remove = (id: any) => {
  return axiosInstance.delete<any>(`/projects/${id}`);
};
const removeAll = () => {
  return axiosInstance.delete<any>(`/projects`);
};
const findByName = (name: string) => {
  return axiosInstance.get<Array<ProjectData>>(`/projects?name=${name}`);
};
const ProjectService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByName,
};

export default ProjectService;