import React, { FormEventHandler, useState } from "react";
import userPool from "../userPool";
const Signup = () => {
const[user, setUser]= useState("")
const [password,setPassword] = useState("")

    const onSubmit: FormEventHandler = (event) => {
        event.preventDefault()
        userPool.signUp(user, password, [], [], (err,data)=> {
            if(err){
                console.log(err)
            }console.log(data)
        })
    }
    return(
        <div>
            <form onSubmit={onSubmit}>
                <label htmlFor="user">User Name</label>
                <input 
                value={user}
                 onChange={(event)=> setUser(event.target.value)}>
                 </input>
                 <label htmlFor="password">Password</label>
                 <input 
                value={password}
                 onChange={(event)=> setPassword(event.target.value)}>
                 </input>

                 <button type="submit">Sign Up</button>

            </form>
        </div>
    )
}

export default Signup