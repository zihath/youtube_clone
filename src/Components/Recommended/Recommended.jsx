import React, { useEffect, useState } from 'react'
import './Recommended.css'
import { API_KEY } from '../../data'
import { value_converter } from '../../data'
import { Link } from 'react-router-dom'

const Recommended = ({categoryId}) => {

  const [apiData , setApiData] = useState([]);

  const RecommendedVideoData = async () => {
      try {
        const relatedVideo_url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=IN&maxResults=45&videoCategoryId=${categoryId}&key=${API_KEY}`;
  
        const response = await fetch(relatedVideo_url);
        if (!response.ok) throw new Error("Failed to fetch video data");
  
        const data = await response.json();
        if (data.items.length === 0) throw new Error("No video found");
  
        setApiData(data.items); // Store the first video item
      } catch (error) {
        console.error("Error fetching video:", error.message);
      }
    };

    useEffect(()=>{
      RecommendedVideoData();
    },[])


  return (
    <div className='recommended'>

      {apiData.map((item , index)=>{
        return(
          <Link to = {`/video/${item.snippet.categoryId}/${item.id}`}key = {index} className="side-video-list">
            <img src={item.snippet.thumbnails.medium.url} alt="" />
            <div className='vid-info'>
              <h4>{item.snippet.title}</h4>
              <p>{item.snippet.channelTitle}</p>
              <p>{value_converter(item.statistics.viewCount)} views</p>

            </div>
          </Link>  
        )
      })}    
    </div>
  )
}

export default Recommended
