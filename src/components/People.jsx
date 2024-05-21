import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Topnav from './templates/Topnav'
import Dropdown from './templates/Dropdown'
import Loading from './Loading'
import axios from '../utils/axios'
import Cards from './templates/Cards'
import InfiniteScroll from 'react-infinite-scroll-component';

const People = () => {

    const [people,setPeople] = useState([]);
    const [page,setPage] = useState(1);
    const [hasMore,setHasMore] = useState(true);
    const navigate = useNavigate()

    const getPeople = async()=>{
 
        try{        
            const {data} =  await axios.get(`/person/popular?page=${page}`);
            if(data.results.length>0)
            {
                setPeople((prevState)=>[...prevState, ...data.results]);
                setPage((prevState)=>prevState+1);
            }
            else{
                setHasMore(false);
            }
          
        }catch(error){
            console.log("error occur while fetching people data:"+error);
        }
           
       }

       const refreshPage  = ()=>{

        if(people.length >0)
        {
            setPage(1);
            setPeople([]);
            getPeople();
        }
        else{
            getPeople();
        }
    
    }
    
    useEffect(()=>{
    
        refreshPage();
    
    },[])

    return people.length>0 ?(
        <div className='w-screen h-screen'>
            <div className='px-10 w-full flex justify-between items-center'>
              <h1 className='text-2xl text-zinc-400 text-semibold'>
              <i onClick={()=>navigate(-1)} className="hover:text-[#6556CD] mr-4 ri-arrow-left-line"></i>
                Celebs
              </h1>
              <div className='flex w-[80%] h-[30%]  gap-5 items-center'>
              <Topnav />
              </div>
    
            </div> 
    
            <InfiniteScroll    dataLength={people.length} loader={<h1>Loading</h1>} hasMore={hasMore} next={getPeople}>
            <Cards data={people} type="person" />
            </InfiniteScroll>
            
            
            
    
        </div>
      ):<Loading />
}

export default People