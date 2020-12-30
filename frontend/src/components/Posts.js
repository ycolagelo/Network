import React from "react";
import { Link } from "react-router-dom";
import { Card } from "./Card";

export function Posts({ posts = [], usernameToNotLink = "" }) {
  return posts.map((post) => {
    let usernameLink;
    if (usernameToNotLink === post.username) {
      usernameLink = <div>{post.username}</div>;
    } else {
      usernameLink = (
        <Link to={`/profile/${post.username}`}>{post.username}</Link>
      );
    }

    return (
      <Card key={post.id} extraClasses="mb-2">
        <div className="font-medium">
          {usernameLink}

          {/* {usernameToNotLink === post.username ? (
            <div>{post.username}</div>
          ) : (
            <Link to={`/profile/${post.username}`}>{post.username}</Link>
          )} */}
        </div>
        <div>{post.posts}</div>
        <div className="text-sm text-gray-500">{post.date}</div>
      </Card>
    );
  });
}
