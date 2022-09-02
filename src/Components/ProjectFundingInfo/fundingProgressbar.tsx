import React from "react";
import { Box, LinearProgress, LinearProgressProps, Typography, Container } from '@mui/material';

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

export default function FundingProgressInputView(props: { targetFunding: number } & { currentFundedAmount: number }) {
  return (
    <Box sx={{ width: '100%' }}>
      <FundingProgressBar value={(props.currentFundedAmount / props.targetFunding) * 100} />
    </Box>
  )
};