export {removeTvshow} from '../reducers/tvshowSlice'
import axios from '../../utils/axios'
import { loadTvshow } from '../reducers/tvshowSlice'


export const loadTvshowAction = (id) => async(dispatch,getState)=>{
   
    const details = await axios.get(`/tv/${id}`)
    const externalIds = await axios.get(`/tv/${id}/external_ids`)
    const recommendations = await axios.get(`/tv/${id}/recommendations`)
    const similar = await axios.get(`/tv/${id}/similar`)
    const videos = await axios.get(`/tv/${id}/videos`)
    const watchProviders = await axios.get(`/tv/${id}/watch/providers`)

    let finalDetails = {
        details:details.data,
        externalIds:externalIds.data,
        recommendations:recommendations.data.results,
        similar:similar.data.results,
        videos:videos.data.results.find((video)=>video.type ==='Trailer'),
        watchProviders:watchProviders.data.results.IN
    }

    dispatch(loadTvshow(finalDetails))


}
