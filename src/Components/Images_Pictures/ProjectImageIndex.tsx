import React, { FunctionComponent, useState } from "react";
import { Grid, Typography, Box, Button } from "@mui/material";
import { useDropzone } from 'react-dropzone'
import {uploadToS3} from "../../services/UploadService";

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

    const onDrop = (files: File[]) => {
        const imageBlob = new Blob([files[0]], { type: files[0].type });
        setUploadedImage(URL.createObjectURL(imageBlob));
        const data = {
            file: files[0],
        }
        uploadToS3(data);
    }

    const { getRootProps, getInputProps } = useDropzone({ onDrop })

    return (
        <Grid container p={2} justifyContent="center">
            <Grid item xs={12} sm={5} lg={4} sx={dialogStyle} p={2}>
                <Grid container gap={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6">Create New Project</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1">Upload Cover Image</Typography>
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