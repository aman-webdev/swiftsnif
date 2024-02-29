import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Input from '../components/Input'
import Button from '../components/Button'
import { HashLoader } from 'react-spinners'
import passwordSvg from "../assets/password.svg"
import { toast } from 'react-toastify'

const Password = () => {
  const [token,setToken] = useState('')
  const [password,setPassword] = useState('')
  const [isLoading,setIsLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(()=>{
      const urlparams = new URLSearchParams(location.search)
      const tokenFromParam = urlparams.get('token')
      if(!tokenFromParam) navigate('/notfound')
      setToken(tokenFromParam || '')
  },[location.search])

  

  const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try{
      setIsLoading(true)
     const res = await fetch(`${import.meta.env.VITE_BE_URL}/verify-password?token=${token}&method=client`,{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({password})
      })
      const result = await res.json()
      if(!res.ok) throw new Error(result.message)
      window.location.href = result.redirectUrl;
      setIsLoading(false)
    }catch(err:any){
      toast.error(err.message || 'Something went wrong')
      setIsLoading(false)
    }
    
  } 

 
  return (
    <div className='w-full'>
      <img src={passwordSvg} className='opacity-60 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10' alt="" />
      <h2 className='font-heading  text-2xl sm:text-4xl text-center mt-28'>Uhh Oh..</h2>
      <h2 className='font-heading text-2xl sm:text-4xl text-center mt-2'>This URL is Password Protected</h2>

      <p className='text-center text-xs mt-4'>Enter Password to Continue</p>
      <form onSubmit={handleSubmit} className="relative sm:w-3/4 mx-auto">
          <Input
            value={password}
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mx-auto block mt-20 px-3 py-4 border-[5px] border-[#] focus:outline-none rounded-md border-spacing-10 text-lg"
            placeholder="******"
          />
          <Button
            className="w-24 text-xs sm:text-base sm:w-40 h-12 rounded-md bg-[#DCF2F1] text-[#4c4c4c] absolute top-1/2 -translate-y-1/2 right-2"
          >
           { !isLoading ?  "Submit" : <HashLoader size={30} className="mx-auto" color="#4c4c4c"/>}
          </Button>
        </form>
    </div>
  )
}

export default Password