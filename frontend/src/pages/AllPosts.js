import React, { useState, useEffect } from "react";
import { Posts } from "../components/Posts";
import { NewPostForm } from "../components/NewPostForm";
import { Card } from "../components/Card";
import { Title } from "../components/Title";
import { PageControls } from "../components/PageControls";

const PAGE_SIZE = 10;

export function AllPostsPage({ isAuthenticated, currentUser }) {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsCount, setPostsCount] = useState(0);

  function fetchPosts() {
    fetch(`api/post_list?limit=${PAGE_SIZE}&offset=${page * PAGE_SIZE}`)
      .then((response) => response.json())
      .then((result) => {
        setPosts(result.data);
        setPostsCount(result.count);
      });
  }

  useEffect(() => {
    fetchPosts();
  }, [page]);

  function handlePostCreated(newPost) {
    setPosts([newPost, ...posts]);
  }

  function handlePostUpdated(updatedPost) {
    const updatedPostList = posts.map((post) => {
      if (post.id === updatedPost.id) {
        return updatedPost;
      }
      return post;
    });
    setPosts(updatedPostList);
  }

  function handlePageChange(page) {
    setPage(page);
    window.scrollTo(0, 0);
  }

  const pageCount = Math.ceil(postsCount / PAGE_SIZE);

  return (
    <div className="mt-2">
      <Title>All Posts</Title>
      {isAuthenticated && (
        <Card>
          <NewPostForm onNewPostCreated={handlePostCreated} />
        </Card>
      )}
      <div className="mt-4">
        <Posts
          posts={posts}
          currentUser={currentUser}
          onPostUpdated={handlePostUpdated}
          isAuthenticated={isAuthenticated}
        />
      </div>
      <div className="flex justify-center mt-2 mb-4">
        <PageControls
          pageCount={pageCount}
          page={page}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}
