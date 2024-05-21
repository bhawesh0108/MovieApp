import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Topnav from './templates/Topnav'
import Dropdown from './templates/Dropdown'
import Loading from './Loading'
import axios from '../utils/axios'
import Cards from './templates/Cards'
import InfiniteScroll from 'react-infinite-scroll-component';

const Movies = () => {

    const [category,setCategory] = useState("now_playing")
    const [movies,setMovies] = useState([]);
    const [page,setPage] = useState(1);
    const [hasMore,setHasMore] = useState(true);
    const navigate = useNavigate()
 
    const handleCategoryChange = (e)=>{
      setCategory(e.target.value);
    
  }

  const getMovies = async()=>{
 
    try{        
        const {data} =  await axios.get(`/movie/${category.toLowerCase()}?page=${page}`);
        if(data.results.length>0)
        {
            setMovies((prevState)=>[...prevState, ...data.results]);
            setPage((prevState)=>prevState+1);
        }
        else{
            setHasMore(false);
        }
      
    }catch(error){
        console.log("error occur while fetching movies data:"+error);
    }
       
   }

const refreshPage  = ()=>{

    if(movies.length >0)
    {
        setPage(1);
        setMovies([]);
        getMovies();
    }
    else{
        getMovies();
    }

}

useEffect(()=>{

    refreshPage();

},[category])

return movies.length>0 ?(
    <div className='w-screen h-screen'>
        <div className='px-10 w-full flex justify-between items-center'>
          <h1 className='text-2xl text-zinc-400 text-semibold'>
          <i onClick={()=>navigate(-1)} className="hover:text-[#6556CD] mr-4 ri-arrow-left-line"></i>
            Movies
            <small className='text-zinc-600 text-md ml-2'>
                ({category})
            </small>
          </h1>
          <div className='flex w-[80%] h-[30%]  gap-5 items-center'>
          <Topnav />
          <Dropdown  title="Category" options={["popular","upcoming","top_rated","now_playing"]} handleChange ={handleCategoryChange} />
          </div>

        </div> 

        <InfiniteScroll    dataLength={movies.length} loader={<h1>Loading</h1>} hasMore={hasMore} next={getMovies}>
        <Cards data={movies} type="movie" />
        </InfiniteScroll>
        
        
        

    </div>
  ):<Loading />
}

export default Movies