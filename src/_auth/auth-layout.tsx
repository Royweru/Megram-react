import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AuthLayout = () => {
  const isAuthenticated= false


  return(
   <>
    {isAuthenticated?(
      <Navigate to={"/"}/>
    ):(
      <>
      <div className=' w-full flex h-screen'>
      <section className='w-1/2  flex flex-1 py-10  h-full flex-col justify-center items-center'>
            <Outlet />
          </section>

          <img src="https://images.unsplash.com/photo-1498081959737-f3ba1af08103?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y29vbCUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D" alt="" className=' w-1/2 hidden xl:block h-screen object-cover object-center bg-no-repeat'/>
      </div>
          
      </>
    )}
   </>
  )
}

export default AuthLayout