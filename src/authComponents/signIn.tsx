import React, { FormEventHandler, useState } from "react";
import userPool from "../userPool";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js"
const SignIn = () => {
const[userName, setUserName]= useState("")
const [password,setPassword] = useState("")

    const onSubmit: FormEventHandler = (event) => {
        event.preventDefault()
        const user = new CognitoUser({
            Username: userName,
            Pool: userPool
        })
    

    const authDetails = new AuthenticationDetails({
        Username: userName,
        Password: password

    })

    user.authenticateUser(authDetails, {
        onSuccess: (data) => {
            console.log("onSuccess: ", data)
        },
        onFailure: (err) => {
            console.error("onFailure : ", err)
        },
        newPasswordRequired: (data) => {
            console.log("newPasswordRequired: ", data)
        }
    })
    }
    return(
        <div>
            <form onSubmit={onSubmit}>
                <label htmlFor="userName">User Name</label>
                <input 
                value={userName}
                 onChange={(event)=> setUserName(event.target.value)}>
                 </input>
                 <label htmlFor="password">Password</label>
                 <input 
                value={password}
                 onChange={(event)=> setPassword(event.target.value)}>
                 </input>

                 <button type="submit">Sign In</button>

            </form>
        </div>
    )
}

export default SignIn