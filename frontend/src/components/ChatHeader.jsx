import React from 'react'
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';
import { CircleX } from 'lucide-react';

const ChatHeader = () => {
  const { selectedUser, setSelectedUser} = useChatStore();
  const { onlineUsers} = useAuthStore();
  return (
    <div className='p-2.5 border-b-2 border-base-300'>
      <div className='flex items-center justify-between px-1'>
        <div className='flex items-center gap-3'>

          <div className={`avatar ${onlineUsers.includes(selectedUser._id) ? "avatar online" : "avatar offline"}`}>
            <div className='rounded-full size-10 relative'>
              <img src={selectedUser.profilePic || "profile.png"} alt={selectedUser.fullName} />
            </div>
          </div>

          <div>
            <h3 className='font-medium'>{selectedUser.fullName}</h3>
            <p className='text-sm text-base-content/70'>
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>

         

        </div>
        <button onClick={() => setSelectedUser(null)}>
          <CircleX  className='size-7 text-base-content/80'  />
          </button>
      </div>
    </div>
  )
}

export default ChatHeader;