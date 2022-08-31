import React, { useContext, useEffect, useState } from 'react'
import { Grid, Box, Paper } from '@mui/material'
import UserContext from '../../context/user/UserContext';
import CommentForm from './CommentForm'
import ProjectComments from './ProjectComments'

const CommentsSection = () => {

    const [isLoaded, setIsLoaded] = useState<boolean | undefined>(false)

    const { isLoggedIn } = useContext(UserContext);

    useEffect(() => {
        setIsLoaded(false)
    }, [isLoaded])

    return (
        <Grid container justifyContent="space-between">
            {isLoggedIn && <Grid item xs={4} paddingTop={2}>
                <Box width={220} >
                    <Paper>
                        {<CommentForm setIsLoaded={setIsLoaded} />}
                    </Paper>
                </Box>
            </Grid>}
            <Grid item xs={7}>
                <Box paddingTop={2}>
                    <ProjectComments setIsLoaded={setIsLoaded} isLoaded={isLoaded}/>
                </Box>
            </Grid>
        </Grid>
    )
}

export default CommentsSection;