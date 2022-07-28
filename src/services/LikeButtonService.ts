import ProjectData from "../types/Project";
import ProjectService from "./ProjectService";

export const likeProject = async (projectId: any, likedBy: ProjectData) => {
    return await ProjectService.updateProject(projectId, likedBy);
};