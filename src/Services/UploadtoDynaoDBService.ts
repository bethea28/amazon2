import AWS from 'aws-sdk';

const { REACT_APP_AWS_SECRET_KEY, REACT_APP_AWS_REGION, REACT_APP_AWS_ACCESS_KEY, REACT_APP_AWS_BUCKET_NAME } =
  process.env;

export const UpdatetoDDB = (data: any = null): any => {
  AWS.config.update({
    accessKeyId: REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: REACT_APP_AWS_SECRET_KEY,
    region: REACT_APP_AWS_REGION,
  });
  var docClient = new AWS.DynamoDB.DocumentClient();
  console.log('Importing into DynamoDB. Please wait.');
  var params = {
    TableName: 'amzn_2_users',
    Item: {
      avatar: data,
    },
  };
  docClient.put(params, function (err, data) {
    if (err) {
      console.error('Error JSON:', JSON.stringify(err, null, 2));
    } else {
      console.log('PutItem succeeded');
    }
  });
};
