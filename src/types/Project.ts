export default interface ProjectData {
  projectId?: string,
  userId?: string,
  createdAt?: Date,
  projectName: string,
  description: string,
  targetFundingAmount: string,
  targetFundingDate: Date,
  category: string,
  images: Array<string>,
  likedBy: Array<string>
}