import axiosInstance from '../apiConfig';
import AWS from 'aws-sdk';
import UserService from './UserService';
import UserData from '../types/User';

type FileUploadData = {
  file: File;
};

const {
  REACT_APP_AWS_SECRET_KEY,
  REACT_APP_AWS_REGION,
  REACT_APP_AWS_ACCESS_KEY,
  REACT_APP_AWS_BUCKET_NAME,
} = process.env;

export const uploadToS3 = (data: FileUploadData): void => {
  AWS.config.update({
    accessKeyId: REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: REACT_APP_AWS_SECRET_KEY,
  });

  const myBucket = new AWS.S3({
    params: { Bucket: REACT_APP_AWS_BUCKET_NAME },
    region: REACT_APP_AWS_REGION,
  });

  const params = {
    ACL: 'public-read',
    Body: data.file,
    Bucket: REACT_APP_AWS_BUCKET_NAME || 'None',
    Key: data.file.name,
  };

  myBucket
    .putObject(params)
    .on('success', () => {
      const uploadedFileUrl = myBucket.getSignedUrl('getObject', { Key: params.Key });
      const userData: UserData = {} as UserData;
      const userId = '123'; // Add user ID of the logged in user | Or use a hardcoded one from your DB to test the API call
      userData.profileImageUrl = uploadedFileUrl;
      UserService.updateProfile(userData, userId)
        .then(() => console.log('Saving to backend was successful'))
        .catch(() => console.log('Saving to backend failed'));
    })
    .send((err) => {
      if (err) console.log(err);
    });
};
