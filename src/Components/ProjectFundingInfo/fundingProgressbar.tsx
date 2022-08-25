import React, { useEffect, useState } from "react";
import ProjectFundingInfoService from "../../services/ProjectFundingInfoService";
import ProjectFundingInfoType from "../../types/ProjectFundingInfo";
import { Box, LinearProgress, LinearProgressProps, Typography } from '@mui/material';


function FundingProgressBar(props: LinearProgressProps & { value: number }) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
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
    //get project goal amout take in project ID via context
    // get transactions total 
    let projectId = "d8ff08d1-6f3b-4e38-b6fb-218e88663891"; //To do: React Context -> get project Id
    let projectGoal = 100; //TO DO: api request project target amount , get project milestones , 

    //percent calculated to measure funding progress
    const [progress, setProgress] = React.useState(0);

    //types called from backend
    const [fundinginfo, setFundingInfo] = useState<ProjectFundingInfoType>(
        { totalamount: (0),
        totaltransactions: (0),
        projectId: ''
        }
        );
    /*try{
        useEffect(() => {
            const fetchData = async () => {
                await ProjectFundingInfoService.getProjectFundingInfo(projectId).then((response) => {
                setFundingInfo(response.data);
            })
        }
        fetchData()
        }, []);
        const percent = (fundinginfo.totalamount / projectGoal )*100;
        console.log(percent);
        setProgress(percent);
        console.log(progress);

    } catch(error){
        setProgress(10);
    } */

    useEffect(() => {
      setProgress(10);
    }, []);
    //setProgress(10);
    console.log(progress);
     
    return(
        <Box sx={{ width: '100%' }}>
            <FundingProgressBar value={progress} />
        </Box>
    )
    //card display with total funded amount
    //create bar with milestones & funded amount\
};

