"use client"

import React, {useState} from 'react'
import { registerAction } from '../serverActions/registerAction'

const RegisterForm = () => {
    const [username, setUserName] =useState('')
    const [email, setEmail] =useState('')
    const [password, setPassword] =useState('')

    const registerHandler= async(e)=>{
        e.preventDefault()

        const userRegisterDetails={username,email,password}
        console.log(userRegisterDetails)

        try{
          await registerAction(userRegisterDetails)
          console.log("Registration successful")
        }
        catch(error){
            console.log("Error in registration: ",error)
        }

    }
  return (
    <div className='formContainer'>
        <form onSubmit={registerHandler} className='formSection'>
            <h3>User name</h3>
            <input type="text" name="username" onChange={(e)=>{setUserName(e.target.value)}} />
            <h3>Email</h3>
            <input type="email" name="email" onChange={(e)=>{setEmail(e.target.value)}} />  
            <h3>Password</h3>   
            <input type="password" name="password" onChange={(e)=>{setPassword(e.target.value)}} />

            <button type="submit">Register</button>
        </form>
      
    </div>
  )
}

export default RegisterForm
