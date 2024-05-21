import axios from 'axios'

const instance = axios.create({
    baseURL:"https://api.themoviedb.org/3/",
    headers:{
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MDllYTUxYzYzN2JiZWYyZWRhMGE4M2Q3NGY5NzhlZCIsInN1YiI6IjY2MzcyYjU1MGY1MjY1MDEyYmJiYzU3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rJeJ6Eq8_xC-Xv_TTodu9ctWjicdtfE8o2YUNM_OwO8'
      }

})

export default instance;