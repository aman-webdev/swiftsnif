import { useState } from 'react'
import { BrowserRouter ,Routes,Route } from 'react-router-dom'
import { Expired, Home, NotFound, Password } from './Pages'
import {Header} from './components'
import Footer from './components/Footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <div className='min-h-screen flex flex-col px-4 md:px-2'>
    <BrowserRouter>
          <Header/>
            
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/password' element={<Password/>}/>
          <Route path='/expired' element={<Expired/>}/>
          <Route path='*' element={<NotFound/>}/>

        </Routes>
        <Footer/>
        <ToastContainer position='top-center'/>
    </BrowserRouter >
    </div>
  )
}

export default App
