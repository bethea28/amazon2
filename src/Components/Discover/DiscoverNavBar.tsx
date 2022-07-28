import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    Typography,
    Grid,
    AppBar,
    Toolbar
} from "@mui/material"
import { categories } from '../../types/Categories';
import "./Discover.css"

export default function DiscoverNavBar() {

    return (
        <>
        {/* <Typography>Discover</Typography> */}
        {/* <AppBar position='static' color='transparent'> */}
            <Toolbar variant='regular'>
            <Typography
            component='div'
            sx={{
              flexGrow: 1
            }}>
            {categories.map((category) => (
                <NavLink to={`/categories/${category}`} key={category} className='navbar'>{category}</NavLink>
            ))}
            </Typography>
            </Toolbar>
        {/* </AppBar> */}
        {/* <Grid
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
        </Grid> */}
    </>
    )
}