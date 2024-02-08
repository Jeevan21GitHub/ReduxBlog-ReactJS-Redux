import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { sub } from "date-fns";
import axios from "axios";

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'


const initialState = {
    posts: [],
    status: 'idle',
    error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get(POSTS_URL)
    return response.data
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    const response = await axios.post(POSTS_URL, initialPost)
    // console.log(response);
    return response.data
})
export const updatePost = createAsyncThunk('posts/updatePost', async (initialPost) => {
    try {
        const { id } = initialPost
        const response = await axios.put(`${POSTS_URL}/${id}`, initialPost)
        // console.log(response);
        return initialPost
    }
    catch (err) {
        console.log(err.message);
        return initialPost
    }
})
export const deletePost = createAsyncThunk('posts/deletePost', async (initialPost) => {
    try {
        const { id } = initialPost
        console.log(id);
        const response = await axios.delete(`${POSTS_URL}/${id}`)
        console.log(response);
        return initialPost
    }
    catch (err) {
        console.log(err.message);
        return initialPost
    }
})

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        addPost: {
            reducer(state, action) {

                state.posts.push(action.payload)
            },
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        date: new Date().toISOString(),
                        reactions: {
                            thumsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0
                        },
                        userId
                    }
                }
            }

        },
        addReactions(state, action) {
            const { postId, reaction } = action.payload
            const existingPost = state.posts.find(post => post.id === postId)

            if (existingPost) {
                existingPost.reactions[reaction]++;
            }
        }
        ,
        removePost: (state, action) => {
            const postIdToRemove = action.payload;
            state.posts = state.posts.filter(post => post.id !== postIdToRemove);
        }

    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                let min = 1
                const loadedPosts = action.payload.map(post => {
                    post.date = sub(new Date(), { minutes: min++ }).toISOString()
                    post.reactions = {
                        thumsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                    return post
                })
                state.posts = state.posts.concat(loadedPosts)
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'rejected'
                state.error = action.error.message
            })
            .addCase(addNewPost.fulfilled, (state, action) => {

                const sortedPosts = state.posts.sort((a, b) => {
                    if (a.id > b.id) return 1;
                    if (a.id < b.id) return -1
                    return 0
                })

                action.payload.id = sortedPosts[sortedPosts.length - 1].id + 1;
                action.payload.userId = Number(action.payload.userId)
                action.payload.date = new Date().toISOString()
                action.payload.reactions = {
                    thumsUp: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                    coffee: 0
                }

                state.posts.push(action.payload)
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                const { id } = action.payload
                action.payload.date = new Date().toISOString()
                action.payload.userId = Number(action.payload.userId)
                const posts = state.posts.filter((post) => post.id !== id)
                state.posts = [...posts, action.payload]
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                const { id } = action.payload
                const posts = state.posts.filter((post) => post.id !== id)
                state.posts = posts
            })
    }
})
export const AllPostsList = (state) => state.posts.posts
export const getPostStatus = (state) => state.posts.status
export const getPostsError = (state) => state.posts.error
export const selectPostById = (state, postId) => 
    state.posts.posts.find((post) => post.id === postId)

// Memorization
export const selectPostsByUsers=createSelector(
    [AllPostsList,(state,userId)=>userId],
    (posts,userId)=>posts.filter(post=>post.userId===userId)
)

export const { addPost, removePost, addReactions } = postsSlice.actions;
export default postsSlice.reducer;