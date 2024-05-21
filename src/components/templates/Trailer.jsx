import React from 'react'
import ReactPlayer from 'react-player'
import { useNavigate,Link, useLocation } from 'react-router-dom'
import { useSelector } from'react-redux'
import Pagenotfound from '../Pagenotfound'

const Trailer = () => {

  const location = useLocation()
  
  const category = location.pathname.includes('movie')?"movie":"tv";
  
  const navigate = useNavigate()
  const {info} = useSelector(state=>state[category])
  return (
    <div className='absolute top-0 left-0 z-[1000] h-screen w-screen bg-[rgba(0,0,0,0.9)] flex justify-center items-center'>
    <Link onClick={()=>navigate(-1)} className="absolute top-[10%] right-[10%] text-2xl hover:text-[#6556CD] mr-4 text-white ri-close-fill"></Link>

    {info.videos && info.videos.key ? 
    <ReactPlayer controls playing="true" height="60%" width="70%" url={`https://www.youtube.com/watch?v=${info.videos.key}`}>

    </ReactPlayer>

    :<Pagenotfound />}

    </div>
  )
}

export default Trailer