import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Box, Card } from '@mui/material';
import ProjectService from '../../services/ProjectService';
import {ProjectMilestonesData} from '../../types/Milestone';
import Milestone from './milestone';
import { MilestoneType } from '../../types/Milestone';

const projectId = "04b92dac-4c7d-473a-86d7-b8c15e39e1d2";

/*Milestone User Input and Patch Call to Add to BE database (Projects Table*/
export default function Milestones(){

    const { handleSubmit } = useForm<ProjectMilestonesData>();

    /*Builds Milestone Object Array for be*/
    const [milestones, setMilestones] = useState<MilestoneType[]>(Array(1).fill({
        name: '',
        description: '',
        amount: 0,
      }));
    
    /*sets state for milestone array based on user input from select dropdown */
    const handleChange = (event: SelectChangeEvent<number>) => {
        setMilestones(Array(event.target.value as number).fill({
            name: '',
            description: '',
            amount: 0,
          }))
    };
    
    /*set state for single milestone and add to array milestones*/
    const setSingleMilestone = (milestone: MilestoneType, index: number) => {
        const arrayCopy = JSON.parse(JSON.stringify(milestones));
        arrayCopy[index] = milestone;
        setMilestones(arrayCopy);
      };
    
    /*on form submission updates BE projects table with milestones input*/
    const onsubmit = async (data: ProjectMilestonesData) => {
        alert('You have submitted');
        console.log(milestones);
        data.milestones = milestones;
       return await ProjectService.updateProjectMilestone(projectId, data);
    }

    return(
        <Card>
        <Box sx={{
            width: 300,
            height:200}}>
            <FormControl fullWidth>
                <InputLabel>Define Number of Project Milestones</InputLabel>
                <Select
                    value = {milestones.length}
                    onChange ={handleChange}
                >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                </Select>
            </FormControl>
        </Box>
        <form onSubmit={handleSubmit(onsubmit)}>
        <label> Milestones</label>
        {milestones.map((milestone, index) => {
                        const setMilestone = (newMilestone: MilestoneType) =>
                        setSingleMilestone(newMilestone, index);
                        return (
                            <Milestone
                              onChange={setMilestone}
                              values={milestone}
                              key={index}
                            />)})}
        <input type="submit" value="Submit" />
        </form>
        </Card>
    );
}