import React, { useEffect, useState } from 'react'
import { useChatStore } from '../store/useChatStore';
import Skeletal from './Skeletal';
import { User } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import Search from './Search';

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUsers, isUsersLoading} = useChatStore();
 
  
  const {onlineUsers} = useAuthStore();
  const [showOnlineOnly, setshowOnlineOnly] = useState(false);
  console.log("mga users", selectedUser);

  useEffect(() => {
    getUsers();
  }, [getUsers])

  const filteredUsers =  showOnlineOnly ? users.filter(user => onlineUsers.includes(user._id)) : users;

  if(isUsersLoading) return <Skeletal />
  return (
  <aside className='h-full w-20 lg:w-72 border-r-2 border-base-300 flex flex-col transition-all duration-200 '>
    <div className='border-b-2 border-base-300 p-5 w-full'>
      <div className='flex items-center gap-2'>
      <User className='size-6' />
      <span className='font-medium hidden lg:block'>Contacts</span>
      </div>

      <Search />

      <div className='mt-3 hidden lg:flex items-center gap-2'>
        <label className='cursor-pointer flex items-center gap-2'>
          <input type='checkbox'
            checked={showOnlineOnly} 
            onChange={(e) => setshowOnlineOnly(e.target.checked)}
            className='checkbox checkbox-sm'/>
            <span className='text-sm '>Show online only</span>
        </label>
        <span className='text-xs text-green-500'>({onlineUsers.length - 1} online)</span>
      </div>
    </div>

    <div className='overflow-y-auto w-full '>
      {filteredUsers.map((user) => (
        
        <button
        key={user._id}
        onClick={() => setSelectedUsers(user)}
        className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}`}>

        <div className='relative mx-auto lg:mx-0'>
          <img 
            src={user?.profilePic || "profile.png"}
            alt={user.name}
            className='size-12 object-cover rounded-full'
          />

          {onlineUsers.includes(user._id) && (
            <span className='absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-offset-zinc-300' />
          )}
        </div>
     

        <div className='hidden lg:block text-left min-w-0'>
          <div className='font-medium truncate'>{user.fullName}</div>
          <div className='text-sm text-zinc-400'>
            {onlineUsers.includes(user._id) ? "Online" : "Offline"}
          </div>
        </div>
       
        </button>
      ))}
       {filteredUsers.length === 0 && (
          <div className='text-sm text-center m-4 text-zinc-400'> No online</div>
        )}
    </div>
  </aside>
  )
}

export default Sidebar;