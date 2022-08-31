import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { FormControl, Card, TextField, Box, MenuItem, Typography, Paper, Container, Button } from '@mui/material';
import ProjectService from '../../services/ProjectService';
import {ProjectMilestonesData} from '../../types/Milestone';
import Milestone from './milestone';
import { MilestoneType } from '../../types/Milestone';
import { useNavigate, useParams } from 'react-router-dom';

/*Milestone User Input and Patch Call to Add to BE database (Projects Table*/
export default function Milestones(){

    const { projectId } = useParams();

    const navigate = useNavigate()
    
    const { handleSubmit } = useForm<ProjectMilestonesData>();

    /*Builds Milestone Object Array for be*/
    const [milestones, setMilestones] = useState<MilestoneType[]>(Array(1).fill({
        name: 'Fill in Milestone Name',
        description: 'Fill in Milestone Description',
        amount: 0,
      }));
    
    /*sets state for milestone array based on user input from select dropdown */
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMilestones(Array(Number(event.target.value)).fill({
            name: 'Fill in Milestone Name',
            description: 'Fill in Milestone Description',
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
        data.milestones = milestones;
        return await ProjectService.updateProjectMilestone(projectId, data).then((response) =>  navigate(`/projects/${projectId}/imagesUpload`));
    }

    return(
      <Container maxWidth='xl'>
        <Paper elevation={10} style={{ padding: 40 }}>
          <Box sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}>
            <FormControl fullWidth sx={{ m: 1 }} variant="filled">
              <Typography variant='h4' align='left' margin='dense'>
                Select Number of Project Milestones 
                </Typography >
                <Typography variant='subtitle1' align ='left' margin='dense'>Milestones are checkpoints that highlight the successful completion of funding goals.</Typography>
                <TextField
                select
                label = "select"
                value = {milestones.length}
                onChange ={handleChange}
                >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                </TextField>
              </FormControl>
            
            <form onSubmit={handleSubmit(onsubmit)}>
              <Typography variant='h5' align='left' margin='dense'>
                      Enter Project Milestone Description
              </Typography>
              {milestones.map((milestone, index) => {
                            const setMilestone = (newMilestone: MilestoneType) =>
                            setSingleMilestone(newMilestone, index);
                            return (
                                <Milestone
                                  onChange={setMilestone}
                                  values={milestone}
                                  key={index}
                                />)})}
            <Button type='submit' variant='contained' color='primary'>Submit</Button>
            </form>
            </Box>
          </Paper>
        </Container>
    );
}