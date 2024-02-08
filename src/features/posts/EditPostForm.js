import React, {useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updatePost, selectPostById, deletePost } from './postsSlice';

import { selectAllUsers } from '../users/userSlice';
import { useNavigate, useParams } from 'react-router-dom';

const EditPostForm = () => {
    const dispatch = useDispatch();
    const { postId } = useParams()
    const users = useSelector(selectAllUsers)
    const post = useSelector((state) => selectPostById(state, Number(postId)))
    const [title, setTitle] = useState(post?.title);
    const [content, setContent] = useState(post?.body);
    const [userId, setUserId] = useState(post?.userId);
    const [addRequestStatus, setAddRequestStatus] = useState('idle')

    const navigate=useNavigate()
  

    // console.log(users);

    const btnEnabled = Boolean(title) && Boolean(content) && Boolean(userId) && addRequestStatus === 'idle'

    const titleChange = (e) => {
        setTitle(e.target.value);
    }

    const contentChange = (e) => {
        setContent(e.target.value);
    }
    const onAuthorChange = (e) => {
        setUserId(e.target.value)
    }
    const userOptions = users.map((user, index) => (
        <option key={index} value={user.id}>{user.name}</option>

    ))
    const onSavePost = (e) => {
        e.preventDefault()
        if (btnEnabled) {
            try {
                setAddRequestStatus('pending')
                dispatch(updatePost({id:post.id, title: title, body: content,userId, reactions:post?.reactions})).unwrap()
                setTitle("");
                setContent("");
                setUserId("")
                navigate(`/posts/${postId}`)
            }
            catch (err) {
                console.log('Failed to save the post', err);
            }
            finally {
                setAddRequestStatus('idle')
            }
        }
    }
    const onDelete = (e) => {
        e.preventDefault()
        if (btnEnabled) {
            try {
                setAddRequestStatus('pending')
                dispatch(deletePost({id:post.id})).unwrap()
                setTitle("");
                setContent("");
                setUserId("")
                navigate(`/`)
            }
            catch (err) {
                console.log('Failed to save the post', err);
            }
            finally {
                setAddRequestStatus('idle')
            }
        }
    }
    return (
        <section className='pt-10 '>
            <div className='container w-2/3 mx-auto'>
                <div>
                    <h2 className='pb-2 text-2xl font-bold text-left'>Update Post</h2>
                    <div>
                        <form >
                            <div className='flex flex-col mb-2'>
                                <label className='mb-1 text-xl font-semibold'>Post Title:</label>
                                <input value={title} type='text' placeholder='Title...' className='p-2 rounded-xl ' onChange={titleChange} />
                            </div>
                            <div className='flex flex-col mb-2'>
                                <label className='mb-1 text-xl font-semibold'>Author:</label>
                                <select value={userId} onChange={onAuthorChange} className='p-2 rounded-xl '>
                                    <option value="">Select</option>
                                    {userOptions}
                                </select>
                            </div>
                            <div className='flex flex-col mb-2'>
                                <label className='mb-1 text-xl font-semibold'>Post Content:</label>
                                <textarea value={content} type='text' placeholder='Content...' className='h-20 p-2 rounded-xl' onChange={contentChange} />
                            </div>
                            <div className='flex flex-row items-start justify-between mt-5 mb-2' >
                                <button disabled={!btnEnabled} value={"Add Post"} className={`p-2 rounded-xl ${btnEnabled ? "bg-green-950 cursor-pointer" : "bg-gray-600"}  text-white w-1/2 mr-1`} onClick={onSavePost}>Update Post</button>
                                <button disabled={!btnEnabled} value={"Add Post"} className={`p-2 rounded-xl ${btnEnabled ? "bg-red-950 cursor-pointer" : "bg-gray-600"}  text-white w-1/2 `} onClick={onDelete}>Delete Post</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EditPostForm
