export {removeMovie} from '../reducers/movieSlice'
import axios from '../../utils/axios'
import { loadMovie } from '../reducers/movieSlice'


export const loadMovieAction = (id) => async(dispatch,getState)=>{
   
    const details = await axios.get(`/movie/${id}`)
    const externalIds = await axios.get(`/movie/${id}/external_ids`)
    const recommendations = await axios.get(`/movie/${id}/recommendations`)
    const similar = await axios.get(`/movie/${id}/similar`)
    const videos = await axios.get(`/movie/${id}/videos`)
    const watchProviders = await axios.get(`/movie/${id}/watch/providers`)

    let finalDetails = {
        details:details.data,
        externalIds:externalIds.data,
        recommendations:recommendations.data.results,
        similar:similar.data.results,
        videos:videos.data.results.find((video)=>video.type ==='Trailer'),
        watchProviders:watchProviders.data.results.IN
    }

    dispatch(loadMovie(finalDetails))


}
