import React from "react";
import { Card } from "./Card";

export function Posts({ posts = [] }) {
  return posts.map((post) => {
    return (
      <Card key={post.id} extraClasses="mb-2">
        <div className="font-medium">{post.username}</div>
        <div>{post.posts}</div>
        <div className="text-sm text-gray-500">{post.date}</div>
      </Card>
    );
  });
}
