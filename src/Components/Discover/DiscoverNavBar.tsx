import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    Typography,
    Toolbar,
    Grid
} from "@mui/material"
import { categories } from '../../types/Categories';
import "./Discover.css"

export default function DiscoverNavBar() {

    return (
        <Grid alignSelf='center'>
            <Toolbar variant='regular'>
                <Typography
                component='div'
                sx={{flexGrow: 1}}>
                {categories.map((category) => (
                    <NavLink to={`/categories/${category}`} key={category} className='navbar'>{category}</NavLink>
                ))}
                </Typography>
            </Toolbar>
        </Grid>
    )
}