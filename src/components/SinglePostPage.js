import React, { useEffect } from 'react'
import AuthorName from '../features/users/AuthorName'
import TimeAgo from '../features/posts/TimeAgo'
import ReactionButtons from '../features/posts/ReactionButtons'
import { useSelector } from 'react-redux'
import { selectPostById } from '../features/posts/postsSlice'
import { Link, useParams } from 'react-router-dom'


const SinglePostPage = () => {
  const { postId } = useParams()
  const post = useSelector((state) => selectPostById(state, Number(postId)))

  if (!post) {
    return (
      <div className='flex justify-center w-1/2 mx-auto text-center'>
        <div className='py-10 mt-10 text-gray-300 border border-gray-500 w-52'>
          Page Not fount <Link to={`/`}><span className='text-blue-500 border-b border-blue-500'>go back</span></Link>
        </div>
      </div>
    )
  }
  return (
    <div className='items-center w-3/4 mx-auto mt-5'>

      <div className="relative px-2 py-3 mb-2 border border-b-gray-50 rounded-xl">
        <h2 className="pb-1 text-xl font-semibold text-left">
          {post.title}
        </h2>
        <p className="text-left">{post.body}</p>
        <p className="text-sm font-semibold text-left">

          <Link to={`/posts/edit/${post.id}`} className='pr-1 text-purple-950'>Edit Post</Link>
          <AuthorName userId={post.userId} />
          <TimeAgo timeStamp={post.date} />
        </p>
        <ReactionButtons post={post} />
        <Link to={`/posts/edit/${post.id}`}
          className="absolute top-0 px-2 mt-2 font-bold text-white bg-red-600 rounded right-2"

        >
          X
        </Link>
      </div>

    </div>
  )
}

export default SinglePostPage
