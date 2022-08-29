import axios from "axios";
import axiosInstance from "../apiConfig";
import ProjectFundingInfoType from "../types/ProjectFundingInfo";

/* call to BE to get funding info about a project to display PARAMs: projectID */
async function getProjectFundingInfo(projectId: string | undefined){
    return await axiosInstance.get<ProjectFundingInfoType>(
        `transaction/projects/${projectId}`
    )
    ;
}

const ProjectFundingInfoService = {
    getProjectFundingInfo
}

export default ProjectFundingInfoService;



