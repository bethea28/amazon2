import React, { FunctionComponent, useState } from "react";
import { Grid, Typography, Box, Button } from "@mui/material";
import { useDropzone } from 'react-dropzone'
import { uploadToS3 } from "../../../services/UploadService";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

const dialogStyle = {
    backgroundColor: "#E9F3FF",
};

const imagePlaceholder = {
    minHeight: 160,
    backgroundColor: "#FFF",
}

const imageStyle = {
    maxWidth: '100%',
    height: '100%',
    objectFit: 'cover',
}

const uploadBtnStyle = {
    backgroundColor: "#FFF",
    color: "#004CBA",
    textTransform: "none",
    fontWeight: 600,
};

const backBtnStyle = {
    color: "#212121",
    textTransform: "none",
};

const completeBtnStyle = {
    backgroundColor: '#004CBA',
    textTransform: "none",
    fontWeight: 600,
}

export const ProjectImageIndex: FunctionComponent = () => {
    const [uploadedImage, setUploadedImage] = useState<string>('');

    const onDrop = async (files: File[]) => {
        const imageBlob = new Blob([files[0]], { type: files[0].type });
        setUploadedImage(URL.createObjectURL(imageBlob));
        const data = {
            file: files[0],
        }

        const uploadedS3URL = await uploadToS3(data);
        console.log('Uploaded image url..', uploadedS3URL)

        // Todo: Update the image url in Project data model coverImage and call projectService.updateProject()
    }

    const { getRootProps, getInputProps } = useDropzone({ onDrop })

    return (
        <Grid container justifyContent="center">
            <Grid item p={1} sx={dialogStyle} >
                <Grid container gap={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6">Create New Project</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1">Upload Cover Images</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                {!uploadedImage ? <Box sx={imagePlaceholder} /> : <Box sx={imageStyle} component="img" alt="image-placeholder" src={uploadedImage} />}
                            </Grid>
                            <Grid item xs={6}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12} {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <Button
                                            sx={uploadBtnStyle}
                                            onClick={() => onDrop}
                                            disableElevation
                                            variant="outlined"
                                            fullWidth
                                        >
                                            Upload Image
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="body2">
                                            Format must be JPG or PNG and smaller than 1 MB
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container justifyContent="space-between" pt={6} alignItems="center">
                            <Grid item>
                                <Button sx={backBtnStyle} startIcon={<KeyboardArrowLeftIcon />}>
                                    Go Back
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button disableElevation variant="contained" sx={completeBtnStyle}>
                                    Next
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ProjectImageIndex