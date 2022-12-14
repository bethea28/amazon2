import React from "react";
import { 
Grid, 
Typography, 
Paper,
Container, 
Link
} from "@mui/material";

export default function About() {

    return (
        <Container maxWidth='xs'>
            <Grid>
            <Paper variant='outlined' style={{margin: 10, padding: 15}}>
                <Typography gutterBottom variant='h5'>Carolina Lunardi Correa</Typography>
                <Link href="https://www.linkedin.com/in/carolina-io/" target="_blank" rel="noreferrer"><Typography variant='body2' gutterBottom>LinkedIn</Typography></Link>
            </Paper>
            <Paper variant='outlined' style={{margin: 10, padding: 15}}>
                <Typography gutterBottom variant='h5'>Johnnia Arroyo</Typography>
                <Link href="https://www.linkedin.com/in/johnnia-arroyo/" target="_blank" rel="noreferrer"><Typography variant='body2' gutterBottom>LinkedIn</Typography></Link>
            </Paper>
            <Paper variant='outlined' style={{margin: 10, padding: 15}}>
                <Typography gutterBottom variant='h5'>Kim Le</Typography>
                <Link href="https://www.linkedin.com/in/15117713/" target="_blank" rel="noreferrer"><Typography variant='body2' gutterBottom>LinkedIn</Typography></Link>
            </Paper>
            <Paper variant='outlined' style={{margin: 10, padding: 15}}>
                <Typography gutterBottom variant='h5'>Lorraine Nabua</Typography>
                <Link href="https://www.linkedin.com/in/lorrainebnabua/" target="_blank" rel="noreferrer"><Typography variant='body2' gutterBottom>LinkedIn</Typography></Link>
            </Paper>
            <Paper variant='outlined' style={{margin: 10, padding: 15}}>
                <Typography gutterBottom variant='h5'>Seniha Ipekci</Typography>
                <Link href="https://www.linkedin.com/in/seniha-i-502a64126/" target="_blank" rel="noreferrer"><Typography variant='body2' gutterBottom>LinkedIn</Typography></Link>
            </Paper>
            <Paper variant='outlined' style={{margin: 10, padding: 15}}>
                <Typography gutterBottom variant='h5'>Sornam Vairavan</Typography>
                <Link href="https://www.linkedin.com/in/sornamvairavan/" target="_blank" rel="noreferrer"><Typography variant='body2' gutterBottom>LinkedIn</Typography></Link>
            </Paper>
            <Paper variant='outlined' style={{margin: 10, padding: 15}}>
                <Typography gutterBottom variant='h5'>Tra DIE</Typography>
                <Link href="https://www.linkedin.com/in/tra-ange-die/" target="_blank" rel="noreferrer"><Typography variant='body2' gutterBottom>LinkedIn</Typography></Link>
            </Paper>
            </Grid>
        </Container>
    )
}