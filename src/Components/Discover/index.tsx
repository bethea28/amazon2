import React from 'react';
import {
    Typography,
    Grid
} from "@mui/material"

export default function Discover() {

    return (
        <>
        <Typography>Discover</Typography>
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