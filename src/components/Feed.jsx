import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FEED_URL } from '../utils/constants';
import { addFeed } from '../utils/slices/feedSlice';
import UserCard from './UserCard';

const Feed = () => {
    const feed=useSelector((store)=>store.feed);
  const dispatch=useDispatch();
  const getFeed=async() => {
    try{
       const res=await axios.get(FEED_URL,{withCredentials:true});
       dispatch(addFeed(res.data.feedData))
    } catch(err) {
        console.log(err);
    }
  }
  useEffect(()=>{
    getFeed();
  },[])
  if(feed.length===0) return <h1 className='text-center text-3xl font-bold w-full h-full'>No New Users Found</h1>
  return (
     <div className='w-full h-[80%]'>
        {feed&&<UserCard user={feed[0]}/>}
     </div>
  )
}

export default Feed