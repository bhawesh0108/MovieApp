export {removePerson} from '../reducers/personSlice'
import axios from '../../utils/axios'
import { loadPerson } from '../reducers/personSlice'


export const loadPersonAction = (id) => async(dispatch,getState)=>{
   
    const details = await axios.get(`/person/${id}`)
    const externalIds = await axios.get(`/person/${id}/external_ids`)
    const combinedCredits = await axios.get(`/person/${id}/combined_credits`)
    const movieCredits = await axios.get(`/person/${id}/movie_credits`)
    const tvCredits = await axios.get(`/person/${id}/tv_credits`)



    let finalDetails = {
        details:details.data,
        externalIds:externalIds.data,
        combinedCredits:combinedCredits.data.cast,
        movieCredits:movieCredits.data.cast,
        tvCredits:tvCredits.data.cast,

    }

    dispatch(loadPerson(finalDetails))


}
