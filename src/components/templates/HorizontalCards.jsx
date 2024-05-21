import React from 'react'
import {Link} from 'react-router-dom'

const HorizontalCards = ({data}) => {
  return (


    <div className='w-[full] h-[40vh] flex overflow-x-auto gap-4 p-4'>
        {data.map((item,index)=>(
                      <Link key={index} to={`/${item.media_type}/details/${item.id}`} className='min-w-[15%] h-[75%] bg-zinc-800 overflow-y-auto'>
                      <img className='rounded-lg w-full h-[50%] mb-2 object-cover' src={item.backdrop_path || item.profile_path?`https://image.tmdb.org/t/p/original/${item.backdrop_path || item.profile_path}`:`/noImageFound.png`} alt="" />
                      <h1 className='w-[100%] text-white text-md font-bold'>{item.title || item.original_title || item.name || item.original_name}</h1>
                      <p className='mt-2 w-[100%] text-white text-xs'>{item.overview.slice(0,70)}<Link className="text-zinc-500"> ...more</Link></p>
                      </Link>
        ))}


    </div>
  )
}

export default HorizontalCards