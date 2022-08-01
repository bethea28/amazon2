import axiosInstance from '../apiConfig';
import AWS from 'aws-sdk';
import UserService from './UserService';
import UserData from '../types/User';

type FileUploadData = {
  file: File;
};

const { REACT_APP_AWS_SECRET_KEY, REACT_APP_AWS_REGION, REACT_APP_AWS_ACCESS_KEY, REACT_APP_AWS_BUCKET_NAME } =
  process.env;

export const uploadToS3 = async (data: FileUploadData) => {
  AWS.config.update({
    accessKeyId: REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: REACT_APP_AWS_SECRET_KEY,
  });

  const s3Object = new AWS.S3({
    params: { Bucket: REACT_APP_AWS_BUCKET_NAME },
    region: REACT_APP_AWS_REGION,
  });

  const params = {
    ACL: 'public-read',
    Body: data.file,
    Bucket: REACT_APP_AWS_BUCKET_NAME || 'None',
    Key: data.file.name,
  };

  const s3UploadResponse = await s3Object
    .upload({
      Bucket: REACT_APP_AWS_BUCKET_NAME || 'None',
      Key: data.file.name,
      Body: data.file,
    })
    .promise();

  return s3UploadResponse.Location;
};
