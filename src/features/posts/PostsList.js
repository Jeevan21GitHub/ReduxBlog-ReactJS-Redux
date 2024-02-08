import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AllPostsList, fetchPosts, getPostStatus, getPostsError, removePost } from "./postsSlice";

import PostExcerpts from "./PostExcerpts";

const PostsList = () => {
  const posts = useSelector(AllPostsList);
  const status = useSelector(getPostStatus)
  const error = useSelector(getPostsError)
  const dispatch = useDispatch()



  

  const onPostRemove = (id) => {
    dispatch(removePost(id))
  }
  let content;
  if (status === 'loading') {
    content = <p>"Loading...:"</p>
  } else if (status === 'succeeded') {
      const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
      content = orderedPosts.map((post, index) => (
      <PostExcerpts key={index} post={post} onPostRemove={onPostRemove} />
    ))
  }
  else if (status === 'failed') {
    content = <p>{error}</p>
  }
  return (
    <section className="pt-10">
      <div className="container w-2/3 mx-auto">
        <div className="text-center">
 
          <div className="">
            {content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostsList;
