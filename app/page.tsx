'use client'
import React from 'react'
import Navbar from './components/Navbar'
import { CardDemo } from './components/ui/card-demo'
const Page = () => {
  return (
    <div>
      <div className='h-[20vh] text-white'>
        <Navbar />
      </div>
      <div className='flex justify-center items-center gap-8 flex-wrap'>
        <CardDemo />
      </div>
    </div>
  )
}

export default Page;

