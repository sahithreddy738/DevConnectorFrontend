import React from 'react'
import Chats from '../components/Chats';

const ChatPage = () => {
  return (
    <div className='w-screen flex px-1'>
       <div className='w-[30%]'>
          <Chats/>
       </div>
    </div>
  )
}

export default ChatPage;