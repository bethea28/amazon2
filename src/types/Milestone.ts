interface MilestoneType {
    name: string,
    description: string,
    amount: number,
};

interface ProjectMilestonesData {
    milestones: Array<MilestoneType>
}

export type {MilestoneType, ProjectMilestonesData};