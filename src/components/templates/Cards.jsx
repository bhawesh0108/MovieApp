import React from 'react'
import { Link } from 'react-router-dom'
const Cards = ({data,type}) => {
  return (
    <div className='px-10 w-[100%]  flex flex-wrap mt-10 justify-between'>

        {data.map((card,index)=>(
         <Link to={`/${card.media_type || type}/details/${card.id}`} key={index} className='relative h-[50%] w-[20%] mr-3 mb-10 rounded-lg'>

        {card.vote_average && (<div className='absolute bg-yellow-600 h-[7vh] w-[7vh] rounded-full text-xl text-white flex justify-center items-center right-[-10%] top-[55%]'>
            {((card.vote_average*10).toFixed())/10}<i className="text-sm ml-1 ri-star-fill"></i>
         </div>)}
         <img className='h-[50vh] object-cover rounded-lg' src={`https://image.tmdb.org/t/p/original/${card.poster_path || card.backdrop_path || card.profile_path }`} alt="" />
         <h1 className='text-xl mt-2 text-zinc-400 text-semibold'> {card.title || card.original_title || card.name || card.original_name}</h1>

        </Link>

        ))}
    


    </div>
  )
}

export default Cards