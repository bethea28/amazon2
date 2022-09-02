import React, { useState, useEffect, useContext } from 'react';
import { Avatar, Container, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, Paper, Typography } from '@mui/material';
import commentService from '../../services/CommentService';
import { useParams, Link } from 'react-router-dom';
import CommentData from '../../types/Comment';
import UserContext from '../../context/user/UserContext';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

interface setStateProps {
    isLoaded: boolean | undefined
    setIsLoaded: React.Dispatch<React.SetStateAction<boolean | undefined>>
}

const ProjectComments = ({ setIsLoaded, isLoaded }: setStateProps) => {

    const { projectId } = useParams();

    const { user, sessionId } = useContext(UserContext);

    const [projectComments, setProjectComments] = useState<Array<CommentData> | []>();

    let userAvatar = user && user.avatar;

    useEffect(() => {
        getComments()
    }, [isLoaded, projectId])

    const getComments = async () => {
        const response = await commentService.getCommentsByProjectId(projectId)
        if (response.data) {
            setProjectComments(response.data)
        }
    }

    const deleteComment = async (comment: CommentData) => {
        await commentService.deleteComment(comment.commentId).then(() => setIsLoaded(true))
    }

    return (
        <Container maxWidth="lg">
            <List sx={{ width: '100%', maxWidth: 480, bgcolor: "#eeeeee" }}>
                {projectComments && projectComments.map((comment: CommentData) => {
                    return (
                        <Paper key={comment.commentId} variant='outlined' square>
                            <ListItem alignItems='flex-start'>
                                <ListItemAvatar>
                                    <Avatar alt="User's photo" src={comment.userName === user?.username ? userAvatar : 'https://picsum.photos/200'} />
                                </ListItemAvatar>
                                <ListItemText primary={comment.content}
                                    secondary={
                                        <Link to={`/profile/${comment.userId}`} className='internalLinks'>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                fontSize='13px'
                                            >
                                                {comment.userName}
                                            </Typography>
                                        </Link>
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