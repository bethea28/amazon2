import React, { useState, useEffect, useContext } from 'react';
import { Avatar, Container, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, Paper, Typography } from '@mui/material';
import commentService from '../../services/CommentService';
import { useNavigate, useParams } from 'react-router-dom';
import CommentData from '../../types/Comment';
import UserContext from '../../context/user/UserContext';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const ProjectComments = () => {

    const { projectId } = useParams();

    const navigate = useNavigate();

    const { user, sessionId } = useContext(UserContext);

    const [projectComments, setProjectComments] = useState<Array<CommentData> | []>();

    const userAvatar: string = (user?.avatar) ? user.avatar : 'https://picsum.photos/200'

    useEffect(() => {
        getComments()
    }, [projectId])

    const getComments = async () => {
        const response = await commentService.getCommentsByProjectId(projectId)
        if (response.data) {
            setProjectComments(response.data)
        }
    }

    const deleteComment = async (comment: CommentData) => {
        await commentService.deleteComment(comment.commentId).then(() => navigate(`/projects/${projectId}`))
    }

    return (
        <Container maxWidth="lg">
            <List sx={{ width: '100%', maxWidth: 480, bgcolor: "#eeeeee" }}>
                {projectComments && projectComments.map((comment: CommentData) => {
                    return (
                        <Paper key={comment.commentId} variant='outlined' square>
                            <ListItem alignItems='flex-start'>
                                <ListItemAvatar>
                                    <Avatar alt='Remy Sharp' src={userAvatar} />
                                </ListItemAvatar>
                                <ListItemText primary={comment.content}
                                    secondary={
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color='text.primary'
                                        >
                                            {comment.userName}
                                        </Typography>
                                    }
                                />
                                {comment.userId === sessionId && <ListItemButton onClick={() => deleteComment(comment)}>
                                    <ListItemIcon>
                                        <DeleteForeverIcon />
                                    </ListItemIcon>
                                </ListItemButton>}
                            </ListItem>
                        </Paper>
                    )
                })}
            </List>
        </Container>
    )
}

export default ProjectComments;