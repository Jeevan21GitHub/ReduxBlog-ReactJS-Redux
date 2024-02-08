import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllUsers } from './userSlice'
import { Link } from 'react-router-dom'

const UsersList = () => {
    const users=useSelector(selectAllUsers)
    
    const renderUsers=users.map((user)=>(

        <li key={user.id} className='p-3 text-left'><Link to={`/users/${user.id}`}>{user.id}. {user?.name}</Link></li>
    
    ))
  return (
    <section className='flex flex-col items-center justify-center'>
        <div className='mt-5 text-2xl font-bold '>Users</div>
        <ul>
            {renderUsers}
        </ul>
    </section>
    
  )
}

export default UsersList