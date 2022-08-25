import React from 'react';
import { Box, TextField} from '@mui/material';
import { MilestoneType } from '../../types/Milestone';

/*displays input UI and takes in user input for each milestone*/
export default function Milestone(props: {
    onChange: (m: MilestoneType) => void,
    values: MilestoneType }) {

    return (
        <Box>
            <TextField
                id="milestoneName"
                label="Name your Milestone"
                onChange = {e => props.onChange({ ...props.values, name: e.target.value })}
                />
            <TextField
                id="milestoneDescription"
                label="Add a Description"
                onChange = {e => props.onChange({ ...props.values, description: e.target.value })}
                />
            <TextField
                id="milestoneTargetAmount"
                label="Add target amount for Milestone"
                type = "number"
                onChange = {e => props.onChange({ ...props.values, amount: Number(e.target.value) })}
                />
            </Box>
    )
}