import React, { useEffect, useState } from 'react'
import expiredIcon from "../assets/expired.svg"
import { useLocation } from 'react-router-dom'
const Expired = () => {

  const [shortId,setShortId]= useState('')
  const location = useLocation()

  useEffect(()=>{
    const urlparams = new URLSearchParams(location.search)
    const short= urlparams.get('id')
    setShortId(short || '')
  },[location.search])

  return (
    <div className='w-full py-12'>
      <img src={expiredIcon} className='w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mx-auto opacity-40' alt="" />
      <p className='font-heading text-3xl  md:text-4xl text-center'>The URL <span className='mx-2 block font-poppins text-[#83B8E3] font-bold'>{`${import.meta.env.VITE_BE_URL}/${shortId}`}</span> is Expired </p>
    </div>
  )
}

export default Expired