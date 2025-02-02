import React, { useEffect, useState } from 'react'
import './PlayVideo.css'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import {API_KEY, value_converter} from '../../data.js'
import moment from 'moment'
import { useParams } from 'react-router-dom'


const Playvideo = () => {

  const {videoId} = useParams()

  const [apiData, setApiData] = useState(null);

  const [channelData , setChanneldata] = useState(null);

  const[commentData , setCommentData] = useState([]);

  const fetchComments = async () =>{
    try {
      const commentURL = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet,replies&maxResults=50&videoId=${videoId}&key=${API_KEY}`;

      const response = await fetch(commentURL);
      if (!response.ok) throw new Error("Failed to fetch comment data");

      const comment_data = await response.json();
      if (comment_data.items.length === 0) throw new Error("No video found");

      setCommentData(comment_data.items); // Store the first video item
    } catch (error) {
      console.error("Error fetching comment:", error.message);
    }
  };

  const fetchVideoData = async () => {
    try {
      const videoDetailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${API_KEY}`;

      const response = await fetch(videoDetailsUrl);
      if (!response.ok) throw new Error("Failed to fetch video data");

      const data = await response.json();
      if (data.items.length === 0) throw new Error("No video found");

      setApiData(data.items[0]); // Store the first video item
    } catch (error) {
      console.error("Error fetching video:", error.message);
    }
  };

  const fetchOtherData = async () => {
    try {
      const channelURL = `https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;

      const response = await fetch(channelURL);
      if (!response.ok) throw new Error("Failed to fetch video other data");

      const otherdata = await response.json();
      if (otherdata.items.length === 0) throw new Error("No video found");

      setChanneldata(otherdata.items[0]); // Store the first video item
    } catch (error) {
      console.error("Error fetching other videodata:", error.message);
    }
  };



  useEffect(() => {
    if (videoId) {
      fetchVideoData();
    }
  }, [videoId])

  useEffect(()=>{
    fetchOtherData();
  }, [apiData])

  useEffect(() => {
    if (videoId) {
      fetchComments();
    }
  }, [videoId])


  return (
    <div className='play-video'>
      {/* <video src={video1} controls autoPlay muted></video> */}
      <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}  frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

      <h3>{apiData?apiData.snippet.title:"Title here"}</h3>

      <div className="play-video-info">
        <p>{apiData?value_converter(apiData.statistics.viewCount):"16K"} Views &bull; {apiData?moment(apiData.snippet.publishedAt).fromNow():""}</p>
        <div>
            <span><img src={like} alt="" />{apiData?value_converter(apiData.statistics.likeCount):155}</span>
            <span><img src={dislike} alt="" /></span>
            <span><img src={share} alt="" />share</span>
            <span><img src={save} alt="" />save</span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img src={channelData?channelData.snippet.thumbnails.default.url:""} alt="" />
        <div>
            <p>{apiData?apiData.snippet.channelTitle:""}</p>
            <span>{channelData?value_converter(channelData.statistics.subscriberCount):"0M"}  Subscribers</span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className='vid-desciption'>
        <p>{apiData?apiData.snippet.description.slice(0,250):"descipition here"}</p>
        <hr />
        <h4>{apiData?value_converter(apiData.statistics.commentCount):102} comments</h4>
        
        {commentData.map((item, index)=>{
          return(
            <div key = {index}className='comment'>
                <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                <div>
                    <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} <span>1 day ago</span></h3>
                    <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                    <div className="comment-action">
                        <img src={like} alt="" />
                        <span>{value_converter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                        <img src={dislike} alt="" />
                    </div>
                </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Playvideo
