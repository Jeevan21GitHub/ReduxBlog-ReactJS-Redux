
import { Route ,Routes} from 'react-router-dom';
import './App.css';
import AddPostFrom from './features/posts/AddPostFrom';
import PostsList from './features/posts/PostsList';
import Layout from './components/Layout';
import SinglePostPage from './components/SinglePostPage';
import EditPostForm from './features/posts/EditPostForm';
import UserPosts from './features/users/userPosts'
import UsersList from './features/users/usersList';





function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostsList/>} />
        <Route path="posts">
          <Route index element={<AddPostFrom/>}/>
          <Route path=':postId' element={<SinglePostPage/>}/>
          <Route path='edit/:postId' element={<EditPostForm/>}/>
        </Route>
        <Route path="users">
          <Route index element={<UsersList/>}/>
          <Route path=':userId' element={<UserPosts/>}/>
         
        </Route>
      </Route>
    </Routes>
  )
}

export default App;
