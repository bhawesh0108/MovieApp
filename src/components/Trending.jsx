import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Topnav from './templates/Topnav'
import Dropdown from './templates/Dropdown'
import Loading from './Loading'
import axios from '../utils/axios'
import Cards from './templates/Cards'
import InfiniteScroll from 'react-infinite-scroll-component';

const Trending = () => {

  const [category,setCategory] = useState("all")
  const [duration,setDuration] = useState("day")
  const [trending,setTrending] = useState([]);
  const [page,setPage] = useState(1);
  const [hasMore,setHasMore] = useState(true);


  const navigate = useNavigate()

  const handleCategoryChange = (e)=>{
    setCategory(e.target.value);
  
}
  const handleDurationChange = (e)=>{
    setDuration(e.target.value);
}

const getTrending = async()=>{
 
    try{

        
        const {data} =  await axios.get(`/trending/${category.toLowerCase()}/${duration}?page=${page}`);
        if(data.results.length>0)
        {
            setTrending((prevState)=>[...prevState, ...data.results]);
            setPage((prevState)=>prevState+1);
        }
        else{
            setHasMore(false);
        }
        

    }catch(error){
        console.log("error occur while fetching trending data:"+error);
    }
       
   }

const refreshPage  = ()=>{

    if(trending.length >0)
    {
        setPage(1);
        setTrending([]);
        getTrending();
    }
    else{
        getTrending();
    }

}

useEffect(()=>{

    refreshPage();

},[category,duration])

  return trending.length>0 ?(
    <div className='w-screen h-screen'>
        <div className='px-10 w-full flex justify-between items-center'>
          <h1 className='text-2xl text-zinc-400 text-semibold'>
          <i onClick={()=>navigate(-1)} className="hover:text-[#6556CD] mr-4 ri-arrow-left-line"></i>
            Trending
            <small className='text-zinc-600 text-md ml-2'>
                ({category})
            </small>
          </h1>
          <div className='flex w-[80%] h-[30%]  gap-5 items-center'>
          <Topnav />
          <Dropdown  title="Category" options={["movie","tv","all"]} handleChange ={handleCategoryChange} />
          <Dropdown  title="Duration" options={["day","week"]} handleChange ={handleDurationChange} />
          </div>

        </div> 

        <InfiniteScroll    dataLength={trending.length} loader={<h1>Loading</h1>} hasMore={hasMore} next={getTrending}>
        <Cards data={trending} />
        </InfiniteScroll>
        
        
        

    </div>
  ):<Loading />
}

export default Trending