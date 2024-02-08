import React, { memo } from 'react'
import AuthorName from "../users/AuthorName";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectPostById } from './postsSlice';


const PostExcerpts = ({ postId, onPostRemove }) => {
    const post=useSelector((state)=>selectPostById(state,postId))
    return (
        <div>

            <div className="relative px-2 py-3 mb-2 border border-b-gray-50 rounded-xl">
                <h2 className="pb-1 text-xl font-semibold text-left">
                    {post.title}
                </h2>
                <p className="text-left">{post?.body.slice(0,100)}...</p>
                <p className="text-sm font-semibold text-left">
                    <Link to={`posts/${post.id}`} className='pr-1 text-purple-950'>View Post </Link>
                    <AuthorName userId={post.userId} />
                    <TimeAgo timeStamp={post.date} />
                </p>
                <ReactionButtons post={post} />
                <button
                    className="absolute top-0 px-2 mt-2 font-bold text-white bg-red-600 rounded right-2"
                    onClick={() => onPostRemove(post.id)}
                >
                    X
                </button>
            </div>

        </div>

    )
}


export default PostExcerpts
