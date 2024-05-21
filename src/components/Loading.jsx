import React from 'react'

const Loading = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center bg-black'>
        <img className='h-[80%] object-cover' src="/loader.gif" alt="" />
    </div>
  )
}

export default Loading