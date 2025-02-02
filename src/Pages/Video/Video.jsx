import React, { useEffect } from 'react'
import "./Video.css"
import Playvideo from '../../Components/Playvideo/Playvideo'
import Recommended from '../../Components/Recommended/Recommended'
import { useParams } from 'react-router-dom'



const Video = () => {

  useEffect(()=>{
    window.scrollTo(0 , 0);
  } , [])

  const {videoId, categoryId} = useParams();

  return (
    <div className='play-container'>
      <Playvideo videoId = {videoId}/>
      <Recommended categoryId = {categoryId}/>
    </div>
  )
}

export default Video
