import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadMovieAction, removeMovie } from '../store/actions/movieAction';
import { useParams,useNavigate,Link, useLocation,Outlet } from 'react-router-dom';
import Loading from './Loading';
import HorizontalCards from './templates/HorizontalCards';


const MovieDetails = () => {

  const location = useLocation()


  const {id} = useParams();  
  const navigate = useNavigate()

  const dispatch = useDispatch();  
  const {info} = useSelector(state=>state.movie)

  useEffect(()=>{
    dispatch(loadMovieAction(id))

    return ()=>{
        dispatch(removeMovie())
    }

  },[id])  



  return info ? (
    
  
    <div style={{background:`linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.6),rgba(0,0,0,0.9)), url(https://image.tmdb.org/t/p/original/${info.details.backdrop_path})`,backgroundPosition:"center",backgroundSize:"cover"}} className={`relative ${info.recommendations.length > 0 || info.similar.length > 0 ? "h-[145vh]" : "h-[100vh]"} w-screen py-[3%] px-[4%]`}>

        {/* Part 1 Navbar */}
        <nav className='text-white text-xl flex gap-5'>
        <i onClick={()=>navigate(-1)} className="hover:text-[#6556CD] mr-4 ri-arrow-left-line"></i>
        <a href={`${info.details.homepage}`}>
        <i className="ri-external-link-fill"></i>
        </a>
        <a href={`https://www.instagram.com/${info.externalIds.instagram_id}`}>
        <i className="ri-instagram-fill"></i>
        </a>
        <a href={`https://www.imdb.com/title/${info.externalIds.imdb_id}`}>IMDb</a>
        </nav>

        {/* Part 2 Poster and Details */}

        <div className='flex gap-4 mt-[3%]'>
        <img className='h-[55vh] object-cover rounded-lg' src={`https://image.tmdb.org/t/p/original/${info.details.poster_path || info.details.backdrop_path || info.details.profile_path }`} alt="" />
        <div className='ml-5 flex flex-col gap-2'>
         <h1 className='text-5xl font-black text-white'>
            {info.details.title}
            <small className='text-zinc-400 text-3xl'>
                ({info.details.release_date.split("-")[0]})
            </small>
         </h1>
         <div className='mt-2 flex gap-4 items-center'>
         {info.details.vote_average !=0 && (<div className='bg-yellow-600 h-[7vh] w-[7vh] rounded-full text-xl text-white flex justify-center items-center'>
            {((info.details.vote_average*10).toFixed())/10}<i className="text-sm ml-1 ri-star-fill"></i>
         </div>)}
         <h2 className='text-white text-md'>{info.details.genres.map(genre=>genre.name).join(', ')}</h2>
         <h2 className='text-white text-md'>{info.details.release_date}</h2>
         <h2 className='text-white text-md'>{info.details.runtime} <small className="font-bold">Min</small></h2>
         </div>
         <h1 className='text-white mt-1 text-2xl italic'>{info.details.tagline}</h1>  
         <h2 className='text-white mt-2 text-md'>{info.details.overview}</h2>
         <div className='flex gap-10 mt-3'>
           {info.details.production_companies.map((company,index)=>(
                <div key={index} className='overflow-hidden flex flex-col justify-center items-center gap-2'>
                <img className='h-[4vw] w-[10vw] object-contain rounded-lg' src={company.logo_path?`https://image.tmdb.org/t/p/original/${company.logo_path}`:`/noImageFound.png`} alt="" />
                <h2 className='text-white text-sm font-semibold'>{company.name}</h2>
                </div>

           ))}
         </div>

         <Link to={`${location.pathname}/trailer`} className='bg-[#6556CD] rounded text-white text-1xl font-bold w-[10vw] p-3 mt-8'>
        Watch Trailer
        </Link>

        </div>
        </div>

        {/* Part 3 Distributors */}
        <div className='mt-5 flex flex-col text-white text-md gap-4'>
            {info.watchProviders && info.watchProviders.flatrate &&<div className='flex gap-6 items-center justify-start'>
                <h2>Availaible on Platform</h2>
                {info.watchProviders.flatrate.map((provider,index)=>(
                   <img className='h-[5vh] w-[5vh] object-contain rounded-lg' src={provider.logo_path?`https://image.tmdb.org/t/p/original/${provider.logo_path}`:`/noImageFound.png`} alt="" />
                ))}

            </div>}

            {info.watchProviders && info.watchProviders.rent && <div className='flex gap-6 items-center justify-start'>
                <h2>Availaible for Rent</h2>
                {info.watchProviders.rent.map((renter,index)=>(
                   <img className='h-[5vh] w-[5vh] object-contain rounded-lg' src={renter.logo_path?`https://image.tmdb.org/t/p/original/${renter.logo_path}`:`/noImageFound.png`} alt="" />
                ))}

            </div>}

            {info.watchProviders && info.watchProviders.buy && <div className='flex gap-6 items-center justify-start'>
                <h2>Availaible to Buy</h2>
                {info.watchProviders.buy.map((buyer,index)=>(
                   <img className='h-[5vh] w-[5vh] object-contain rounded-lg' src={buyer.logo_path?`https://image.tmdb.org/t/p/original/${buyer.logo_path}`:`/noImageFound.png`} alt="" />
                ))}

            </div>}
        </div>
        <hr className='mt-10 mb-5 h-[7px]'/>

        {/* Recommendations */}
        <div>
        <h1 className='text-white text-2xl mb-3 text-bold'>Similar Items</h1>
        {info.recommendations.length >0  || info.similar.length >0 ?
        <HorizontalCards data={info.recommendations.length>0?info.recommendations:info.similar}/>
        :<h1 className='text-3xl font-bold text-zinc-400 text-center'>Nothing Similar Found</h1>}
        </div>

        <Outlet /> 





    </div>
  ):<Loading/>
}

export default MovieDetails