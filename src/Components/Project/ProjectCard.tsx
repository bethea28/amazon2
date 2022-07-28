import React from 'react';
import ProjectData from '../../types/Project';

import {
    FavoriteBorderOutlined,
    MonetizationOnOutlined
} from '@mui/icons-material';
import {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    Button,
    Typography,
    IconButton,
    Container,
    Paper,
    Link
} from "@mui/material";

// interface ProjDat1 {
//         projectId: string,
//         userId: string,
//         createdAt: Date,
//         projectName: string,
//         description: string,
//         targetFundingAmount: number,
//         targetFundingDate: Date,
//         category: string,
//         images: Array<string>,
//         likedBy: Array<string>
//   }

const ProjectCard = ({data}: any) => {
    //later to include (data: ProjectData) in params

    return (
        <Container maxWidth="xs">
            <Paper>
                <Card variant='outlined'>
                    <CardActionArea>
                        {/* place holder */}
                        <img alt='project img' src='https://picsum.photos/400/300' />
                        {/* data.image */}
                        <Link href={`/projects/${data.projectId}`} underline="none">
                            <CardContent>
                                <Typography gutterBottom variant="h4">
                                    {/* Project Name */}
                                    {data.projectName}
                                </Typography>
                                <Typography variant='h6' gutterBottom>
                                    {/* Project Description */}
                                    {data.description}
                                </Typography>
                            </CardContent>
                        </Link>
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                By User Name
                                {/* {data.userId.username} */}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button variant='outlined' size="small" color="primary">
                            Back
                        </Button>
                        <IconButton>
                            {/* funding component to be imported */}
                            <MonetizationOnOutlined />
                        </IconButton>
                        <IconButton>
                            {/* like button component to be imported */}
                            <FavoriteBorderOutlined />
                        </IconButton>
                    </CardActions>
                </Card>
            </Paper>
        </Container>
    );
}
export default ProjectCard;