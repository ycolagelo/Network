import React, { useState, useEffect } from "react";
import { Posts } from "../components/Posts";
import { NewPostForm } from "../components/NewPostForm";
import { Card } from "../components/Card";

export function AllPostsPage({ isAuthenticated }) {
  const [posts, setPosts] = useState([]);

  function fetchPosts() {
    fetch("api/post_list")
      .then((response) => response.json())
      .then((posts) => {
        console.log(posts);
        setPosts(posts);
      });
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  function handlePostCreated(newPost) {
    setPosts([newPost, ...posts]);
  }

  return (
    <div className="mt-2">
      <h2 className="text-2xl">All Posts</h2>
      {isAuthenticated && (
        <Card extraClasses="mt-4">
          <NewPostForm onNewPostCreated={handlePostCreated} />
        </Card>
      )}
      <div className="mt-4">
        <Posts posts={posts} />
      </div>
    </div>
  );
}
