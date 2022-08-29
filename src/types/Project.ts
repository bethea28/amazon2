import { MilestoneType } from "./Milestone";

export default interface ProjectData {
  projectId?: string;
  userId?: string;
  createdAt?: Date;
  username: string;
  projectName?: string;
  description?: string;
  targetFundingAmount: number;
  targetFundingDate: Date;
  category: string;
  coverImage?: string;
  images: Array<string>;
  likedBy: Array<string>;
  milestones: Array<MilestoneType>;
  likedCount: number;

}
