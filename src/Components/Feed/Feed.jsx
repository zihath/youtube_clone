import React, { useEffect, useState } from 'react'
import './Feed.css'
import { Link } from 'react-router-dom'
import {API_KEY} from '../../data'
import { value_converter } from '../../data'
import moment from 'moment'





const Feed = ({category}) => {

    const [data , setData] = useState([]);

    const fetchData = async()=>{
        const videoList_url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&regionCode=IN&maxResults=50&videoCategoryId=${category}&chart=mostPopular&key=${API_KEY}`
        await fetch(videoList_url).then(response=>response.json()).then(data=>setData(data.items))
    }

    useEffect(()=>{
        fetchData();
    }, [category])


  return (
    <div className="feed">
        {data.map((items , index)=>{
            return(
                <Link to = {`video/${items.snippet.categoryId}/${items.id}`}className='card'>
                <img src={items.snippet.thumbnails.medium.url} alt="" />
                <h2>{items.snippet.title}</h2>
                <h3>{items.snippet.channelTitle}</h3>
                <p>{value_converter(items.statistics.viewCount)} views &bull; {moment(items.snippet.publishedAt).fromNow()}</p>
            </Link>
            )
        })}
        
    </div>
    
  )
}

export default Feed
