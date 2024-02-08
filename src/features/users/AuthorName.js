import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers, getUsersError, getUsersStatus, selectAllUsers } from './userSlice'

const AuthorName = ({ userId }) => {
  const users = useSelector(selectAllUsers)
 
 
 
  const author = users.find((user) => user.id === userId) 
  return (
    <>
      by {author ? author.name : "Unknown author"}
    </>
  )
}

export default AuthorName
