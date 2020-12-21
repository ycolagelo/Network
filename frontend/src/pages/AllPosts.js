import React, { useState, useEffect } from "react";
import { Posts } from "../components/Posts";

export function AllPostsPage() {
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

  return (
    <div>
      <h2>All Posts</h2>
      <Posts posts={posts} />
    </div>
  );
}
