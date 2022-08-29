import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProjectFundingInfoService from '../../services/ProjectFundingInfoService';
import ProjectService from '../../services/ProjectService';
import { MilestoneType } from '../../types/Milestone';
import FundingProgressInputView from './fundingProgressbar';

export default function ProjectFundingInfo(){

    const { projectId } = useParams();
    
      //total amount funded for a project
      const [progress, setProgress] = useState(0);

      //set project target amount from projects table
      const [targetFunding, setTargetFunding] = useState(0);

      //set backers
      const [totalBackers, setTotalBackers] = useState(0);

      const [milestones, setMilestones] = useState<MilestoneType[]>(Array(1).fill({
        name: 'OG Funders',
        description: 'Thank you for the support!',
        amount: targetFunding,
      }));
  
      //get totalfunded amount and project target funding amount form backend
      useEffect(() => {
        const fetchData = async () => {
          const response1 = await ProjectFundingInfoService.getProjectFundingInfo(projectId);
          if (response1.data) {
          setProgress(response1.data.totalFunding);
          setTotalBackers(response1.data.totalTransactions);
        }
        const response2 = await ProjectService.getProjectById(projectId);
        if (response2.data){
        setTargetFunding(response2.data.targetFundingAmount);
          if (response2.data.milestones){
              setMilestones(response2.data.milestones);
            }
      }}
      fetchData();}, []);
      
    return(
    <Box>
        <FundingProgressInputView targetFunding = {targetFunding} currentFundedAmount = {progress}/>
        <Typography>
            <Box sx={{ fontWeight: 'bold'}}>${progress}</Box>
            <Box sx={{ fontWeight: 'light', typography: 'body2'}}>pledged of ${targetFunding} goal</Box>
        </Typography>
        <Typography> 
            <Box sx={{ fontWeight: 'bold'}}>{totalBackers}</Box>
            <Box sx={{ fontWeight: 'light', typography: 'body2'}}>backers</Box>
        </Typography>
        <Typography> 
            <Box sx={{ fontWeight: 'bold'}}> Project Milestones </Box>
            {milestones.map((milestone, index) => {
            return (<Box sx={{ fontWeight: 'light', typography: 'body2'}}> name: {milestone.name}</Box>)
            })}
        </Typography>
    </Box>
    )
}