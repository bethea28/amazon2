import React, { FunctionComponent, useEffect, useState } from "react";
import { Grid, Typography, Box, Button } from "@mui/material";
import { useDropzone } from 'react-dropzone'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { uploadToS3 } from "../../../services/UploadService";
import { UpdatetoDDB } from "../../../services/UploadtoDynaoDBService";
import UserService from "../../../services/UserService";
import UserData from '../../../types/User'

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

export const RegisterImageIndex: FunctionComponent = () => {
    const [uploadedImage, setUploadedImage] = useState<string>('');

    const onDrop = async (files: File[]) => {
        const imageBlob = new Blob([files[0]], { type: files[0].type });
        setUploadedImage(URL.createObjectURL(imageBlob));
        const data = {
            file: files[0],
        }

        const uploadedS3URL = await uploadToS3(data);
        console.log('Uploaded image url..', uploadedS3URL);

        const userData = {} as UserData;
        userData.avatar = uploadedS3URL;



        // const currUserId = localStorage.getItem('idUser');
        // UserService.updateProfile(userData, '149bac07-2242-4226-b89a-3fd9bd449802');/

        UpdatetoDDB(uploadedS3URL);

    }

    const { getRootProps, getInputProps } = useDropzone({ onDrop })

    return (
        <Grid container p={2} justifyContent="center">
            <Grid item xs={12} sm={5} lg={4} sx={dialogStyle} p={2}>
                <Grid container gap={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6">Register</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1">Upload Avatar</Typography>
                    </Grid>
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

export default RegisterImageIndex
