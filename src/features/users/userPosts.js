import React, { useId } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { selectUserById } from './userSlice'
import { selectPostsByUsers } from '../posts/postsSlice'

const UserPosts = () => {
    const {userId} = useParams()
   
    const user = useSelector(state => selectUserById(state, Number(userId)))
   
    // const userPostList = useSelector((state) => {
    //     const allPosts = AllPostsList(state)
    //     return allPosts.filter(post => post.userId === Number(userId))
    // })

    const userPostList=useSelector((state)=>selectPostsByUsers(state,Number(userId)))
    
    const postTitles=userPostList.map((post)=>(
        <li key={post.id}>
            <Link className='p-3 text-left' to={`/posts/${post.id}`}>☞ {post.title}</Link>
        </li>
    ))
    return (
        <section className='flex flex-col items-center justify-center'>
            <h2 className='my-5 text-2xl font-bold '>{user?.name}</h2>
            <ul>
                {postTitles}
            </ul>
        </section>
    )
}

export default UserPosts