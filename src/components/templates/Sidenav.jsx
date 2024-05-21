import React from 'react'
import {Link} from 'react-router-dom'

const Sidenav = () => {
  return (
    <div className='w-[20%] border-r-2 border-indigo-200 p-10'>

        <h1 className = "text-[#6556CD] text-3xl mb-4">
        <i className="ri-tv-fill mr-3"></i>
        <span>PrimeTV.</span>
        </h1>
        <nav className='flex flex-col text-1xl'>
            <h1 className='my-3 text-white'>New Feeds</h1>
            <Link to="/trending" className="my-2 text-zinc-600 p-4 rounded-lg hover:bg-[#6556CD] hover:text-white duration-300">
            <i className="mr-2 ri-fire-fill"></i>
                Trending</Link>
            <Link to="/popular" className="my-2 text-zinc-600 p-4 rounded-lg hover:bg-[#6556CD] hover:text-white duration-300">
            <i className="mr-2 ri-bard-fill"></i>
            Popular</Link>
            <Link to="/movie" className="my-2 text-zinc-600 p-4 rounded-lg hover:bg-[#6556CD] hover:text-white duration-300">
            <i className="mr-2 ri-movie-2-fill"></i>
            Movies</Link>
            <Link to="tv" className="my-2 text-zinc-600 p-4 rounded-lg hover:bg-[#6556CD] hover:text-white duration-300">
            <i className="mr-2 ri-tv-2-fill"></i>
            TV Shows</Link>
            <Link to="/person" className="my-2 text-zinc-600 p-4 rounded-lg hover:bg-[#6556CD] hover:text-white duration-300">
            <i className="mr-2 ri-team-fill"></i>
            Celebrities</Link>
        </nav>

        <hr className='my-5'/>

        <nav className='flex flex-col text-1xl mt-3'>
            <h1 className='my-2 text-white'>Website Information</h1>
            <Link className="my-1 text-zinc-600 p-4 rounded-lg hover:bg-[#6556CD] hover:text-white duration-300">
            <i className="mr-2 ri-information-fill"></i>
               About PrimeTV </Link>
            <Link className="my-1 text-zinc-600 p-4 rounded-lg hover:bg-[#6556CD] hover:text-white duration-300">
            <i className="mr-2 ri-phone-fill"></i>
            Contact Us</Link>
        </nav>


    </div>
  )
}

export default Sidenav