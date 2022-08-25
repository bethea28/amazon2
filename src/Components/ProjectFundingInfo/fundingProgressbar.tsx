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
          )}%`} funded</Typography>
        </Box>
      </Box>
    );
  }

export default function FundingProgressInputView(props: {targetFunding: number} & {currentFundedAmount: number}){


    return(
        <Box sx={{ width: '100%' }}>
            <FundingProgressBar value={(props.currentFundedAmount/props.targetFunding) *100} />
        </Box>
    )
};


//THINGS TO DO: get ccorrect project id
//remove .THEN in asyn await compare with others
//put line 78 in variable??

