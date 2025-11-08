import { createSlice } from '@reduxjs/toolkit';

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    myPosts: [],
    loading: false,
    error: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
      state.loading = false;
      state.error = null;
    },
    setMyPosts: (state, action) => {
      state.myPosts = action.payload;
      state.loading = false;
      state.error = null;
    },
    addPost: (state, action) => {
      state.posts.unshift(action.payload);
    },
    updatePost: (state, action) => {
      const index = state.posts.findIndex(post => post._id === action.payload._id);
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
      const myIndex = state.myPosts.findIndex(post => post._id === action.payload._id);
      if (myIndex !== -1) {
        state.myPosts[myIndex] = action.payload;
      }
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter(post => post._id !== action.payload);
      state.myPosts = state.myPosts.filter(post => post._id !== action.payload);
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setLoading, setPosts, setMyPosts, addPost, updatePost, deletePost, setError } = postsSlice.actions;
export default postsSlice.reducer;
