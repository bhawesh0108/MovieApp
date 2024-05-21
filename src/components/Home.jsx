import React, { useEffect,useState } from 'react'
import Sidenav from './templates/Sidenav'
import Topnav from './templates/Topnav'
import Header from './templates/Header'
import axios from '../utils/axios'
import HorizontalCards from './templates/HorizontalCards'
import Dropdown from './templates/Dropdown'
import Loading from './Loading'

const Home = () => {

    const [wallpaper,setWallpaper] = useState(null);
    const [trending,setTrending] = useState(null);
    const [category,setCategory] = useState("All");

    const getWallpaper = async()=>{
 
     try{
         const {data} =  await axios.get(`/trending/all/day`);
         setWallpaper(data.results[(Math.random()*data.results.length).toFixed()]);
     }catch(error){
         console.log("error occur while fetching trending data:"+error);
     }
        
    }


    const getTrending = async()=>{
 
        try{
            const {data} =  await axios.get(`/trending/${category.toLowerCase()}/day`);
            setTrending(data.results);
    
        }catch(error){
            console.log("error occur while fetching trending data:"+error);
        }
           
       }

    const handleCategoryChange = (e)=>{
        setCategory(e.target.value);
    }

    useEffect(()=>{

       getTrending();
       !wallpaper && getWallpaper();
     
    },[category])

  return wallpaper && trending ?(
    
    <>
        <Sidenav />
        <div className='w-[80%] overflow-hidden'>
            <Topnav />
            <Header data={wallpaper} />
            <div className='my-3 p-5 flex justify-between'>
                <h1 className='text-zinc-600 text-3xl'>Trending</h1>
                <Dropdown title="Category" options={["movie","tv","all"]} handleChange={handleCategoryChange}/>
            </div>
            <HorizontalCards data={trending}/>
        </div>

    </>
  ):<Loading />
}

export default Home