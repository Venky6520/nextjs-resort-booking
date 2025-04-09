import React from 'react'
import { auth } from '../auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import AdminNavbar from '../components/AdminNavbar'
import AddProduct from '../components/AddProduct'

const AdminPage = async () => {
 const session = await auth()
 if (!session) {
   redirect('/login')
  }

  return (
    <div>
      {session?
        <div>
                <AdminNavbar/>
                <AddProduct/>

          <h1>Welcome to the Admin Page</h1>
          <p>This is admin page</p>
        </div>
        :
        "not authorized"

      }
      <Link href={"/login"}>Login </Link>
    </div>
  )
}

export default AdminPage