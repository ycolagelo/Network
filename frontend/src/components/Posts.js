import React from "react";
import { Link } from "react-router-dom";
import { Card } from "./Card";

export function Posts({ posts = [] }) {
  return posts.map((post) => {
    return (
      <Card key={post.id} extraClasses="mb-2">
        <div className="font-medium">
          <Link to={`/profile/${post.username}`}>{post.username}</Link>
        </div>
        <div>{post.posts}</div>
        <div className="text-sm text-gray-500">{post.date}</div>
      </Card>
    );
  });
}
