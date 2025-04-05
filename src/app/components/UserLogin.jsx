"use client"

import React, { useState } from 'react'
import { loginAction } from '../serverActions/loginAction'
import { useRouter } from 'next/navigation'
import { auth } from '../auth'

const UserLogin = () => {
     const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')
        const [error, setError] = useState('')
const router = useRouter()

        const loginHandler = async (e) => {
            e.preventDefault()
            const loginDetails = { email, password }
            console.log(loginDetails)
            console.log("User from DB:", user);
            

            try {
                const response = await loginAction(loginDetails);
            
                if (response.success) {
                    router.push('/');
                    alert("Login successful");
                } else {
                    setError(response.message || "Login failed");
                }
            } catch (error) {
                setError("Something went wrong. Please try again.");
                console.error("Login error:", error);
            }
            
        }
  return (
    <div className='formContainer'>
            <form onSubmit={loginHandler} className='formSection'>
                {error && <p style={{color:"red"}}>{error}</p>}

                <h3>Email</h3>
                <input 
                    type="text" 
                    name="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />

                <h3>Password</h3>
                <input 
                    type="text" 
                    name="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />

                <button type="submit">Login</button>
            </form>
        </div>
  )
}

export default UserLogin
