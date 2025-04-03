import React from 'react'
import DBconnection from './utilis/config/db'
const HomePage = async() => {
  await DBconnection()
  return (
    <div>
      <h1>Welcome to nextjs</h1>
    </div>
  )
}

export default HomePage
