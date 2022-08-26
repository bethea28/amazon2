import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProjectFundingInfoService from '../../services/ProjectFundingInfoService';
import ProjectService from '../../services/ProjectService';
import { MilestoneType } from '../../types/Milestone';
import FundingProgressInputView from './fundingProgressbar';

export default function ProjectFundingInfo(){

    //NEED TO GET PROJECT ID FROM PARAMs
    //let projectIdTransaction = "hello"; //To do: React Context -> get project Id
    //let projectIdProject = "a87c7825-a0ab-4c98-aad1-8224216b6b03";

    const { projectId } = useParams();
    
      //total amount funded for a project
      const [progress, setProgress] = useState(0);

      //set project target amount from projects table
      const [targetFunding, setTargetFunding] = useState(0);

      //set backers
      const [totalBackers, setTotalBackers] = useState(0);

      const [milestones, setMilestones] = useState<MilestoneType[]>();
  
      //get totalfunded amount and project target funding amount form backend
      useEffect(() => {
        const fetchData = async () => {
          await ProjectFundingInfoService.getProjectFundingInfo(projectId).then((response) => {
          setProgress(response.data.totalFunding);
          setTotalBackers(response.data.totalTransactions);
        }) 
        await ProjectService.getProjectById(projectId).then((response) => {
        setTargetFunding(response.data.targetFundingAmount);
        setMilestones(response.data.milestones);
    }) 
      }
      fetchData();
      }, []);
    
      console.log(milestones);
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
    </Box>
    )
}