import React from 'react';
import {
    Typography,
    Grid,
    AppBar,
    Toolbar
} from "@mui/material"
import { categories } from '../../types/Categories';

export default function Discover() {

    return (
        <>
        <Typography>Discover</Typography>
        {/* <AppBar position='static'> */}
            <Toolbar>
            {categories.map((category) => (
                <Typography variant='body2'>{category}</Typography>
            ))}
            </Toolbar>
        {/* </AppBar> */}
        <Grid
            container
            spacing={0}
            justifyContent='center'
            alignItems='center'
            flexDirection='column'
        >
            <Grid
            container
            sx={{
                flexDirection: "row",
            }}
            >
            <Grid>
            </Grid>
            </Grid>
        </Grid>
    </>
    )
}