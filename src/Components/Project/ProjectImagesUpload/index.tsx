import React, { FunctionComponent, useEffect, useState } from "react";
import { Grid, Typography, Box, Button, Alert } from "@mui/material";
import { useDropzone } from 'react-dropzone'
import { uploadToS3 } from "../../../services/UploadService";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useNavigate, useParams } from "react-router-dom";
import ProjectService from "../../../services/ProjectService";

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

export const AdditionalImageIndex: FunctionComponent = () => {
    const navigate = useNavigate()
    const { projectId } = useParams()
    const [uploadedImage, setUploadedImage] = useState<string>('');
    const [warning, setWarning] = useState<string>()
    const [s3Url, setS3Url] = useState<string>()

    const onDrop = async (files: File[]) => {
        const file = files[0]
        const imageBlob = new Blob([file], { type: file.type });
        const fileType = file['type']
        const uploadedS3URL = await uploadToS3(file);
        const validImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/webp', 'image/jpg']

        if (validImageTypes.includes(fileType)) {
            setUploadedImage(URL.createObjectURL(imageBlob));
            setS3Url(uploadedS3URL)
        } else {
            setWarning("Please upload a valid file type")
        }
    }

    const uploadProjectImages = async () => {
        try {
            if (s3Url) {
                await ProjectService.projectImages(projectId, s3Url);
                toProject()
            } else {
                setWarning("Please select project images to upload")
            }
        } catch (error: any) {
            if (error) {
                if (error.response.status === 401) {
                    setWarning("You are not authorized. Please login to upload images.")
                } else {
                    setWarning("Sorry, the server encountered an unexpected condition that prevented it from fulfilling the request")
                }
            }
        }
    }

    const toProject = () => {
        if (projectId) {
            navigate(`/projects/${projectId}`)
        } else {
            navigate(`/*`)
        }
    }

    useEffect(() => {
        setWarning("")
    }, [uploadedImage])

    const { getRootProps, getInputProps } = useDropzone({ onDrop })

    return (
        <Grid container p={2} justifyContent="center">
            <Grid item xs={12} sm={5} lg={4} sx={dialogStyle} p={2}>
                <Grid container gap={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6">Project Images</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1">Upload Project Images</Typography>
                    </Grid>
                    {warning && <Alert severity="warning">{warning}</Alert>}
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                {!uploadedImage ? <Box sx={imagePlaceholder} /> :
                                    <Box sx={imageStyle} component="img" alt="image-placeholder" src={uploadedImage} />}
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
                                            Upload Images
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="body2">
                                            Format must be JPG, GIF, JPEG, WebP or PNG and smaller than 1 MB
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container justifyContent="space-between" pt={6} alignItems="center">
                            <Grid item>
                                <Button sx={backBtnStyle} onClick={toProject} startIcon={<KeyboardArrowLeftIcon />}>
                                    Go Back
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button disableElevation variant="contained" onClick={uploadProjectImages} sx={completeBtnStyle} >
                                    Complete
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};
export default AdditionalImageIndex