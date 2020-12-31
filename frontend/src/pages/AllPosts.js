import React, { useState, useEffect } from "react";
import { Posts } from "../components/Posts";
import { NewPostForm } from "../components/NewPostForm";
import { Card } from "../components/Card";
import { Title } from "../components/Title";

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
      <Title>All Posts</Title>
      {isAuthenticated && (
        <Card>
          <NewPostForm onNewPostCreated={handlePostCreated} />
        </Card>
      )}
      <div className="mt-4">
        <Posts posts={posts} />
      </div>
    </div>
  );
}
