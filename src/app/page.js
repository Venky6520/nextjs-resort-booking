import React from 'react'
import DBconnection from './utilis/config/db'
import { auth } from './auth'
import { redirect } from 'next/navigation'
import UserNavigation from './components/UserNavigation'
import AdminPage from './admin/page'
const HomePage = async() => {
  const session= await auth()
  await DBconnection()
  if(!session){
    redirect('/login')
  }
  console.log("User role check", session.role)

  const userName= session.username
  return (
    <div>
     {session.role === "user"&&
     <>
      <UserNavigation userName={userName}/>
      <h1>Welcome to nextjs</h1>
      </>}
      {session.role === "admin"&&
      <AdminPage/>}
    </div>
  )
}

export default HomePage
