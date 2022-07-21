import ProjectData from "../types/Project";
import ProjectService from "./ProjectService";

//change likeCount to likedBy
export const likeProject = async (projectId: any, likeCount: ProjectData) => {
    return await ProjectService.updateProject(projectId, likeCount);
};