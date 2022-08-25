import React, { useEffect, useState } from "react";
import ProjectFundingInfoService from "../../services/ProjectFundingInfoService";
import { Box, LinearProgress, LinearProgressProps, Typography } from '@mui/material';
import ProjectService from "../../services/ProjectService";

function FundingProgressBar(props: LinearProgressProps & { value: number }) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: 100, mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }

export default function FundingProgressInputView(){

    //NEED TO GET PROJECT ID FROM PARAMs
    let projectIdTransaction = "hello"; //To do: React Context -> get project Id
    let projectIdProject = "a87c7825-a0ab-4c98-aad1-8224216b6b03";

    //total amount funded for a project
    const [progress, setProgress] = React.useState(0);

    //set project target amount from projects table
    const [fundinginfo, setFundingInfo] = useState(0);

    //get totalfunded amount and project target funding amount form backent
    useEffect(() => {
      const fetchData = async () => {
        await ProjectFundingInfoService.getProjectFundingInfo(projectIdTransaction).then((response) => {
        setProgress(response.data.totalFunding);
      }) 
      await ProjectService.getProjectById(projectIdProject).then((response) => {
      setFundingInfo(response.data.targetFundingAmount);
  }) 
    }
    fetchData();
    }, []);

    return(
        <Box sx={{ width: '100%' }}>
            <FundingProgressBar value={(progress/fundinginfo) *100} />
        </Box>
    )
};


//THINGS TO DO: get ccorrect project id
//remove .THEN in asyn await compare with others
//put line 78 in variable??

