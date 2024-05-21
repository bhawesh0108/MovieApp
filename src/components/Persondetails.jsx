import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadPersonAction, removePerson } from '../store/actions/personAction';
import { useParams,useNavigate,Link, useLocation,Outlet } from 'react-router-dom';
import Loading from './Loading';
import HorizontalCards from './templates/HorizontalCards';
import Dropdown from './templates/Dropdown';

const Persondetails = () => {

    const location = useLocation()

    const {id} = useParams();  
    const navigate = useNavigate()
    const [category,setCategory] = useState("movie")
  
    const dispatch = useDispatch();  
    const {info} = useSelector(state=>state.person)
  
    useEffect(()=>{
      dispatch(loadPersonAction(id))
  
      return ()=>{
          dispatch(removePerson())
      }
  
    },[id])  

    const handleCategoryChange = (e)=>{
        setCategory(e.target.value);
    }



  return info ?(
    <div className='w-screen min-h-[140vh] px-10 py-5'>
       
       <nav className='text-white text-xl flex gap-5'>
        <i onClick={()=>navigate(-1)} className="hover:text-[#6556CD] mr-4 ri-arrow-left-line"></i>
        </nav>

        <div className='flex w-full mt-10'>
        {/* Part 1 img and ids */}
        <div className='flex flex-col w-[20%]'>
        <img className='h-[35vh] object-cover rounded-lg' src={`https://image.tmdb.org/t/p/original/${info.details.poster_path || info.details.backdrop_path || info.details.profile_path }`} alt="" />
        <hr className='mt-10 mb-5 h-[1px] border-none bg-zinc-400'/>
        <div className='flex gap-4 text-white text-xl'>
        <a href={`https://www.instagram.com/${info.externalIds.instagram_id}`}>
        <i className="ri-instagram-fill"></i>
        </a>
        <a href={`https://x.com/${info.externalIds.twitter_id}`}>
        <i class="ri-twitter-x-line"></i>
        </a>
        <a href={`https://www.imdb.com/name/${info.externalIds.imdb_id}`}>IMDb</a>
        </div>

        <div className='mt-5 flex flex-col gap-3 w-full'>
            <div className='flex gap-4 items-center'>
                <h1 className='text-zinc-400 text-lg font-bold'>Career:</h1>
                <h2 className='text-zinc-400 text-md'>{info.details.known_for_department}</h2>
            </div>
            <div className='flex gap-4 items-center'>
                <h1 className='text-zinc-400 text-lg font-bold'>Date of Birth:</h1>
                <h2 className='text-zinc-400 text-md'>{info.details.birthday}</h2>
            </div>
            <div className='flex gap-4 items-center'>
                <h1 className='text-zinc-400 text-lg font-bold'>Birth Place:</h1>
                <h2 className='text-zinc-400 text-md'>{info.details.place_of_birth}</h2>
            </div>
            <div className='flex gap-4 items-center'>
                <h1 className='text-zinc-400 text-lg font-bold'>Deathday:</h1>
                <h2 className='text-zinc-400 text-md'>{info.details.deathday?info.details.deathday:"Still Alive"}</h2>
            </div>

        </div>
        </div>

        {/* Part 2 movie credits */}
        <div className='ml-10 w-[80%]'>
         <h1 className='text-5xl text-zinc-500 font-bold'>{info.details.name}</h1>
         <p className='mt-5 text-lg text-zinc-400'>
            {info.details.biography}
         </p>
         <h2 className='my-5 text-zinc-500 text-2xl font-semibold'>Works In</h2>
         <HorizontalCards data={info.combinedCredits}/>

         <div className='mt-5 flex justify-between'>
            <h2 className='text-2xl text-zinc-500 font-semibold'>Acting</h2>
            <Dropdown title="Category" options={["tv","movie"]} handleChange={handleCategoryChange} />
         </div>

         <div className='mt-5 flex flex-col gap-4 h-[40vh] w-[100%] shadow border-2 rounded-lg border-zinc-600 overflow-y-auto overflow-x-hidden'>
            {info[category+"Credits"].map((credit,index)=>(
                <Link key={index} to={`/${category}/details/${credit.id}`} className='flex flex-col rounded-lg p-4 text-zinc-400 hover:text-white text-lg hover:bg-[#19191D] gap-2'>
               <span>{credit.title || credit.original_title || credit.name || credit.original_name}</span> 
               <span>{credit.character?`Character:${credit.character}`:""}</span>
                </Link>

            ))}
        

         </div>


        </div>
        </div>



    </div>
  ):<Loading />
}

export default Persondetails