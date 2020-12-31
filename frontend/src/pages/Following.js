import React, { useEffect, useState } from "react";
import { Posts } from "../components/Posts";
import { Title } from "../components/Title";

export function FollowingPage() {
  const [posts, setPosts] = useState([]);

  function getPosts() {
    fetch("api/following_posts")
      .then((response) => response.json())
      .then((posts) => {
        console.log(posts);
        setPosts(posts);
      });
  }
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="mt-2">
      <Title>Following</Title>
      <div className="mt-4">
        <Posts posts={posts} />
      </div>
    </div>
  );
}
