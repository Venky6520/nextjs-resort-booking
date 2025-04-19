// "use client"

// import React, {useState} from 'react'
// import { registerAction } from '../serverActions/registerAction'
// import { ToastContainer, toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'


// const RegisterForm = () => {
//     const [username, setUserName] =useState('')
//     const [email, setEmail] =useState('')
//     const [password, setPassword] =useState('')

//     const registerHandler= async(e)=>{
//         e.preventDefault()

//         const userRegisterDetails={username,email,password}
//         console.log(userRegisterDetails)

//         try{
//           await registerAction(userRegisterDetails)
//           toast.success("Registration successful!", { position: "top-right" })

//           console.log("Registration successful")
//         }
//         catch(error){
//           toast.error("Error in registration. Please try again.", { position: "top-right" })

//             console.log("Error in registration: ",error)
//         }

//     }
//   return (
//     <div className='formContainer'>
//                 <ToastContainer />

//         <form onSubmit={registerHandler} className='formSection'>
//             <h3>User name</h3>
//             <input type="text" name="username" onChange={(e)=>{setUserName(e.target.value)}} />
//             <h3>Email</h3>
//             <input type="email" name="email" onChange={(e)=>{setEmail(e.target.value)}} />  
//             <h3>Password</h3>   
//             <input type="password" name="password" onChange={(e)=>{setPassword(e.target.value)}} />

//             <button type="submit">Register</button>
//         </form>
      
//     </div>
//   )
// }

// export default RegisterForm



"use client"

import React, { useState } from 'react'
import { registerAction } from '../serverActions/registerAction'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
const RegisterForm = () => {
    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const router = useRouter()

    const registerHandler = async (e) => {
        e.preventDefault()

        // Validation check
        if (!username || !email || !password) {
            toast.error("All fields are required!", { position: "top-right" })
            return
        }

        const userRegisterDetails = { username, email, password }
        console.log(userRegisterDetails)

        try {
            await registerAction(userRegisterDetails)
            toast.success("Registration successful!", { position: "top-right" })

            // Clear form after successful registration
            setUserName('')
            setEmail('')
            setPassword('')
            router.push('/login') // Redirect to login page after successful registration
        } catch (error) {
            toast.error("Error in registration. Please try again.", { position: "top-right" })
            console.log("Error in registration: ", error)
        }
    }

    return (
        <div className='formContainer'>
            <ToastContainer />
            <form onSubmit={registerHandler} className='formSection'>
                <h3>User Name</h3>
                <input 
                    type="text" 
                    name="username" 
                    value={username} 
                    onChange={(e) => setUserName(e.target.value)} 
                />

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

                <button type="submit">Register</button>
            </form>
            <Link href="/login" >Already have an account? Login</Link>
        </div>
    )
}

export default RegisterForm
