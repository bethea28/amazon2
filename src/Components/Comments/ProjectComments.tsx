import React, { useState, useEffect } from 'react';
import { Box, Paper } from '@mui/material';
import commentService from '../../services/CommentService';
import { useParams } from 'react-router-dom';
import CommentData from '../../types/Comment';

const ProjectComments = () => {

    const { projectId } = useParams();

    const [comments, setComments] = useState<CommentData>();

    useEffect(() => {
        const getComments = async () => {
            if (projectId) {
                await commentService.getCommentsByProjectId(projectId)
                    .then(response => {
                        setComments(response.data)
                    })
            }
        }
        getComments();
    }, [projectId])

    return (
        <Box>
            <Paper style={{ padding: 20 }}>
                {comments && comments.content}
            </Paper>
        </Box>
    )
}

export default ProjectComments;