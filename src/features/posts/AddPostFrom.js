import React, { useId, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNewPost } from './postsSlice';

import { selectAllUsers } from '../users/userSlice';
import { useNavigate } from 'react-router-dom';

const AddPostFrom = () => {
    const dispatch = useDispatch();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [userId, setUserId] = useState(0);
    const [addRequestStatus, setAddRequestStatus] = useState('idle')

    const users = useSelector(selectAllUsers)
    // console.log(users);
    const navigate=useNavigate()
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
                dispatch(addNewPost({ title:title, body:content, userId })).unwrap()
                setTitle("");
                setContent("");
                setUserId("")
                navigate('/')
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
                    <h2 className='pb-2 text-2xl font-bold text-left'>Add a New Post</h2>
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
                            <div className='flex flex-col items-start mb-2' >
                                <button disabled={!btnEnabled} value={"Add Post"} className={`p-2 rounded-xl ${btnEnabled ? "bg-black cursor-pointer" : "bg-gray-600"}  text-white w-24 `} onClick={onSavePost}>Add Post</button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddPostFrom
