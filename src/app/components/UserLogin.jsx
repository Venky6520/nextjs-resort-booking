'use client';

import React from 'react'
import { useState } from 'react'

const UserLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const loginHandler = async (e) => {
        e.preventDefault()

        const loginDetails = { email, password }
        console.log(loginDetails)
    }
  return (
       <div className='formContainer'>
                 {/* <ToastContainer /> */}

         <form onSubmit={loginHandler} className='formSection'>
             
             <h3>Email</h3>
             <input type="email" name="email" onChange={(e)=>{setEmail(e.target.value)}} />  
             <h3>Password</h3>   
             <input type="password" name="password" onChange={(e)=>{setPassword(e.target.value)}} />

             <button type="submit">Login</button>
         </form>
    </div>
    
  )
}

export default UserLogin
