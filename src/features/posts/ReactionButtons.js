import React from 'react'
import { useDispatch } from 'react-redux'
import { addReactions } from './postsSlice'

const ReactionButtons = ({ post }) => {
    const dispatch = useDispatch()
    const reactionEmojis = {
        thumsUp: "👍",
        wow: "😮",
        heart: "❤️",
        rocket: "🚀",
        coffee: "☕"
    }

    const reactionButtons = Object.entries(reactionEmojis).map(([name, emoji]) => {
        return (
            <button key={name} type='button' onClick={() => dispatch(addReactions({ postId: post.id, reaction: name }))} >
                {emoji} {post.reactions[name]}
            </button>
        )
    })
    return (
        <div className='text-left'>
            {reactionButtons}
        </div>
    )
}

export default ReactionButtons
