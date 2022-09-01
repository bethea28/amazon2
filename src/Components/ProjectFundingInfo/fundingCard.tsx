import { Box, Grid } from '@mui/material';
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

      const oneDay = 24 * 60 * 60 * 1000; 

       //set date
       const [targetDate, setTargetDate] = useState(new Date());

       //current date
       const [currentDate, setCurrentDate] = useState(new Date());

      //set backers
      const [totalBackers, setTotalBackers] = useState(0);

      const [count, setCount] = useState(0);

      const [milestones, setMilestones] = useState<MilestoneType[]>(Array(1).fill({
        name: 'Series A Funding',
        description: 'First to fund enters raffle!',
        amount: targetFunding,
      }));
  
      //get totalfunded amount and project target funding amount form backend
      useEffect(() => {
        const fetchData = async () => {
          const response1 = await ProjectFundingInfoService.getProjectFundingInfo(projectId);
          const {totalFunding, totalTransactions} = response1.data;
          if (response1.data) {
          setProgress(totalFunding);
          setTotalBackers(totalTransactions);
        }
        const response2 = await ProjectService.getProjectById(projectId);
        const {targetFundingAmount, milestones, targetFundingDate} = response2.data;
        if (response2.data){
        setTargetFunding(targetFundingAmount);
        setTargetDate(targetFundingDate);
          if (milestones){
              setMilestones(milestones);
            }
      }}
      fetchData();}, [projectId]);
      
    return(
    <Box>
      <Grid container direction={"column"} spacing={2}>
        <Grid item>
          <FundingProgressInputView targetFunding = {targetFunding} currentFundedAmount = {progress}/>
        </Grid>
        <Grid item>
            <Box sx={{ fontWeight: 'bold'}}>{Math.floor(Math.abs((currentDate.getTime() - targetDate.getTime()) / oneDay))}</Box>
            <Box sx={{ fontWeight: 'light', typography: 'body2'}}>pledged of ${targetFunding} goal</Box>
        </Grid>
        <Grid item>
            <Box sx={{ fontWeight: 'bold'}}>${progress}</Box>
            <Box sx={{ fontWeight: 'light', typography: 'body2'}}>pledged of ${targetFunding} goal</Box>
        </Grid>
        <Grid item> 
            <Box sx={{ fontWeight: 'bold'}}>{totalBackers}</Box>
            <Box sx={{ fontWeight: 'light', typography: 'body2'}}>backers</Box>
        </Grid >
        <Grid item> 
            <Box sx={{ fontWeight: 'bold', typography: 'body1' }}> Project Goals </Box>
            {milestones.map((milestone, index) => {
            return (
              <React.Fragment key={index}> 
                <Box sx={{ fontWeight: 'light', typography: 'body2'}} >{milestone.name} </Box>
                <Box sx={{ fontWeight: 'light', typography: 'body2'}} > Target Amount to reach Milestone {count+1}: ${milestone.amount} </Box>
                <Box sx={{ fontWeight: 'light', typography: 'body2'}} > {milestone.description}</Box>
              </React.Fragment>
            )
            })}
        </Grid>
       </Grid>
    </Box>
    )
}