"use client"

import React, { useState } from 'react'
import { loginAction } from '../serverActions/loginAction'
import { useRouter } from 'next/navigation'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

import Link from 'next/link'

const UserLogin = () => {
     const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')
        const [error, setError] = useState('')
const router = useRouter()

        const loginHandler = async (e) => {
            e.preventDefault()
            const loginDetails = { email, password }
            console.log(loginDetails)
            

            try {
                const response = await loginAction(loginDetails);
            
                if (response.success) {
                    router.push('/');
                    // alert("Login successful");
            toast.success("Registration successful!", { position: "top-right" })
                   
                } else {
                    setError(response.message || "Login failed");
                               toast.error("Error in registration. Please try again.", { position: "top-right" })
                   
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
                <ToastContainer/>

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
            <Link href="/register" >If not register? Register</Link>
        </div>
  )
}

export default UserLogin
