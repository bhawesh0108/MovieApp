import React, { useState,useEffect } from 'react'
import {Link} from 'react-router-dom'
import axios from '../../utils/axios'


const Topnav = () => {

   const[query,setQuery] =  useState("");
   const [searches,setSearches] = useState([]);

   const getSearchResult = async()=>{

    try{
        const {data} =  await axios.get(`/search/multi?query=${query}`);
        setSearches(data.results);
    }catch(error){
        console.log("error occur while fetching query:"+error);
    }
       
   }

   useEffect(()=>{
    getSearchResult();
   },[query])


  return (
    <div className='w-full h-[10vh] relative flex gap-5 p-5 z-[100]'>
        <i className="text-zinc-600 text-3xl ri-search-line"></i>
        <input onChange={(e)=>setQuery(e.target.value)} value={query} className="p-5 w-[65%] h-[50%] text-2xl text-zinc-600 font-bold bg-transparent border-none outline-none" type="text" placeholder='search anything...' />
        {query?<i onClick={()=>setQuery("")} className="text-zinc-600 text-3xl ri-close-circle-line"></i>:""}
        
        <div className='absolute w-[60%] max-h-[50vh] top-[70%] left-[10%] overflow-auto rounded-lg'>     
            {searches.map((search,index)=>(
            <Link to={`/${search.media_type}/details/${search.id}`} key={index} className='hover:bg-[#6556CD] hover:text-white duration-300 bg-zinc-300 flex border-b-2 border-zinc-100 text-zinc-600 font-bold  p-3'>
            <img className="w-[10vh] h-[10vh] object-cover rounded mr-10" src={search.backdrop_path || search.profile_path?`https://image.tmdb.org/t/p/original/${search.backdrop_path || search.profile_path}`:`./noImageFound.png`} alt="" />
            <span>{search.title || search.original_title || search.name || search.original_name}</span>
            </Link> 
            ))}

        </div>
    </div>
  )
}

export default Topnav