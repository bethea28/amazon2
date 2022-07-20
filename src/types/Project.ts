export default interface ProjectData {
  userId?: string,
  projectId?: string,
  name: string,
  description: string,
  targetFundingAmount: string,
  targetFundingDate: Date
}