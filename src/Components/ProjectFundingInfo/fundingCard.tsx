import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ProjectFundingInfoService from '../../services/ProjectFundingInfoService';
import ProjectService from '../../services/ProjectService';
import FundingProgressInputView from './fundingProgressbar';

export default function ProjectFundingInfo(){

    //NEED TO GET PROJECT ID FROM PARAMs
    let projectIdTransaction = "hello"; //To do: React Context -> get project Id
    let projectIdProject = "a87c7825-a0ab-4c98-aad1-8224216b6b03";

      //total amount funded for a project
      const [progress, setProgress] = useState(0);

      //set project target amount from projects table
      const [targetFunding, setTargetFunding] = useState(0);

      //set backers
      const [totalBackers, setTotalBackers] = useState(0);
  
      //get totalfunded amount and project target funding amount form backent
      useEffect(() => {
        const fetchData = async () => {
          await ProjectFundingInfoService.getProjectFundingInfo(projectIdTransaction).then((response) => {
          setProgress(response.data.totalFunding);
          setTotalBackers(response.data.totalTransactions);
        }) 
        await ProjectService.getProjectById(projectIdProject).then((response) => {
        setTargetFunding(response.data.targetFundingAmount);
    }) 
      }
      fetchData();
      }, []);
    
    return(
        <Card variant="outlined">
            <CardContent>
                <FundingProgressInputView targetFunding = {targetFunding} currentFundedAmount = {progress}/>
                <Typography>
                    <Box sx={{ fontWeight: 'bold'}}>${progress}</Box>
                    <Box sx={{ fontWeight: 'light', typography: 'body2'}}>pledged of ${targetFunding} goal</Box>
                </Typography>
                <Typography> 
                    <Box sx={{ fontWeight: 'bold'}}>{totalBackers}</Box>
                    <Box sx={{ fontWeight: 'light', typography: 'body2'}}>backers</Box>
                </Typography>
            </CardContent>
        </Card>

    )
}