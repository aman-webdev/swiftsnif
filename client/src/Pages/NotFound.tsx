import React from 'react'
import notfound from "../assets/notfound.svg"

const NotFound = () => {
  return (
    <div className='w-full absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  flex items-center justify-center gap-4 flex-col'>
      <img src={notfound} alt="" className='w-full md:w-1/2 lg:w-1/3 mt-0' />
      <p className='text-2xl font-heading'>Not Found!!</p>
    </div>
  )
}

export default NotFound