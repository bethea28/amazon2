import { CognitoUserPool } from "amazon-cognito-identity-js"

const poolData = {
    // change if make new user pool on cognito
    UserPoolId:"us-west-2_QtXyCueNk",
    ClientId:"59fn58d85q3d5l1eb9co1cbfvg"
}
export default new CognitoUserPool(poolData);