import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Home from './components/Home'
import {Routes,Route} from 'react-router-dom'
import Trending from './components/Trending'
import Popular from './components/Popular'
import Movies from './components/Movies'
import Tvshows from './components/Tvshows'
import People from './components/People'
import Persondetails from './components/Persondetails'
import Moviedetails from './components/Moviedetails'
import Tvshowsdetails from './components/Tvshowsdetails'
import Trailer from './components/templates/Trailer'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='w-screen h-screen bg-[#1F1E24] flex'>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/movie" element={<Movies />} />
        <Route path="/movie/details/:id" element={<Moviedetails />} >
         <Route path="/movie/details/:id/trailer" element={<Trailer/>} />
        </Route>
        <Route path="/tv" element={<Tvshows />} />
        <Route path="/tv/details/:id" element={<Tvshowsdetails />} >
          <Route path = "/tv/details/:id/trailer" element={<Trailer />} />
        </Route>
        <Route path="/person" element={<People />} />
        <Route path="/person/details/:id" element={<Persondetails />} />
      </Routes>

    </div>
  )
}

export default App
