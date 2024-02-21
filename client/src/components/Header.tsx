import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='py-6 text-center font-heading text-3xl sm:text-4xl md:text-5xl  tracking-wider'>
      <Link to={'/'}>SwiftSnif</Link>
    </div>
  )
}

export default Header