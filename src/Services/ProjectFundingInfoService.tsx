import axios from "axios";
import axiosInstance from "../apiConfig";
import ProjectFundingInfoType from "../types/ProjectFundingInfo";

async function getProjectFundingInfo(projectId: string){
        return await axiosInstance.get<ProjectFundingInfoType>(
            `transaction/projects/${projectId}`
        )
        ;
}

const ProjectFundingInfoService = {
    getProjectFundingInfo
}

export default ProjectFundingInfoService;



