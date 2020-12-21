import React from "react";

export function Posts({ posts = [] }) {
  return (
    <ul>
      {posts.map((post) => {
        return (
          <li key={post.id}>
            {post.username} {post.posts} {post.date}
          </li>
        );
      })}
    </ul>
  );
}
