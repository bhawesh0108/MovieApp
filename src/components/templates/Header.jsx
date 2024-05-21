import React from 'react'
import {Link} from 'react-router-dom'

const Header = ({data}) => {
  return (
    <div style={{background:`linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.6),rgba(0,0,0,0.9)), url(https://image.tmdb.org/t/p/original/${data.backdrop_path || data.profile_path})`,backgroundPosition:"center",backgroundSize:"cover"}} className='w-full h-[45vh] flex flex-col justify-end align-start p-10'>
        <h1 className='w-[50%] text-white font-black text-2xl'>{data.title || data.original_title || data.name || data.original_name}</h1>
        <p className='mt-3 w-[50%] text-white'>{data.overview.slice(0,200)}<Link to={`/${data.media_type}/details/${data.id}`} className="text-blue-400"> ...more</Link></p>
        <h2 className='mt-3'>
        <i className="mr-2 text-yellow-600 ri-megaphone-fill"></i><span className='text-white'>{data.release_date?`${data.release_date}`:`Coming Soon`}</span>
        <i className="ml-5 mr-2 text-yellow-600 ri-clapperboard-fill"></i><span className='text-white'>{data.media_type.toUpperCase()}</span>
        </h2>
        <Link to={`/${data.media_type}/details/${data.id}/trailer`} className='bg-[#6556CD] rounded text-white text-1xl font-bold w-[13%] p-3 mt-5'>
        Watch Trailer
        </Link>
    </div>
  )
}

export default Header