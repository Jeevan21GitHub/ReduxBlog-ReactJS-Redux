import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { sub } from "date-fns";
import axios from "axios";

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

const postsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date)
})

const initialState = postsAdapter.getInitialState({
    status: 'idle',
    error: null
})

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
        addReactions(state, action) {
            const { postId, reaction } = action.payload
            const existingPost = state.entities[postId]

            if (existingPost) {
                existingPost.reactions[reaction]++;
            }
        }
        ,
        removePost: (state, action) => {
            const postIdToRemove = action.payload;
            postsAdapter.removeOne(state,postIdToRemove)
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
                postsAdapter.upsertMany(state, action.payload)
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'rejected'
                state.error = action.error.message
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                action.payload.userId = Number(action.payload.userId)
                action.payload.date = new Date().toISOString()
                action.payload.reactions = {
                    thumsUp: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                    coffee: 0
                }

                postsAdapter.addOne(state, action.payload)
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                const { id } = action.payload
                action.payload.date = new Date().toISOString()
                action.payload.userId = Number(action.payload.userId)
                postsAdapter.upsertOne(state, action.payload)
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                const { id } = action.payload
                postsAdapter.removeOne(state, id)
            })
    }
})
export const {
    selectAll: AllPostsList,
    selectById: selectPostById,
    selectIds: selectPostIds
} = postsAdapter.getSelectors(state => state.posts)

export const getPostStatus = (state) => state.posts.status
export const getPostsError = (state) => state.posts.error


// Memorization
export const selectPostsByUsers = createSelector(
    [AllPostsList, (state, userId) => userId],
    (posts, userId) => posts.filter(post => post.userId === userId)
)

export const { addPost, removePost, addReactions } = postsSlice.actions;
export default postsSlice.reducer;