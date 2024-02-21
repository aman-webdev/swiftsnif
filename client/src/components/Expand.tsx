import React, { useState } from 'react'
import Input from './Input'

interface ExpandInterface {
    title:string;
    desc:string;
    inputProps : React.InputHTMLAttributes<HTMLInputElement>
}

const Expand = ({title ,  inputProps , desc}: ExpandInterface) => {


  return (
    <div className='my-6'>
        <p className='font-heading'>{title}</p>
        <p className='text-sm'>{desc}</p>
       <div>
            <Input {...inputProps} />
        </div>
    </div>
  )
}

export default Expand