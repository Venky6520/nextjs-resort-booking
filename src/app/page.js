import React from 'react'
import DBconnection from './utilis/config/db'
import { auth } from './auth'
import { redirect } from 'next/navigation'
import UserNavigation from './components/UserNavigation'
const HomePage = async() => {
  const session= await auth()
  await DBconnection()
  if(!session){
    redirect('/login')
  }
  return (
    <div>
      <UserNavigation/>
      <h1>Welcome to nextjs</h1>
    </div>
  )
}

export default HomePage
