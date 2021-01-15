import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "./Card";
import { PencilIcon } from "./icons/Pencil";
import { CheckCircleIcon } from "./icons/CheckCircle";
import { XCircleIcon } from "./icons/XCircle";
import { ThumbsUpIcon } from "./icons/ThumbsUp";
import { TextArea } from "./forms/TextArea";
import { ThumbsUpFilledIcon } from "./icons/ThumbsUpFilled";

export function Posts({
  posts = [],
  usernameToNotLink = "",
  currentUser,
  onPostUpdated,
}) {
  const [editableId, setEditableId] = useState(null);

  return posts.map((post) => {
    let usernameLink;
    if (usernameToNotLink === post.username) {
      usernameLink = <span>{post.username}</span>;
    } else {
      usernameLink = (
        <Link to={`/profile/${post.username}`}>{post.username}</Link>
      );
    }

    let postBody;
    if (editableId === post.id) {
      postBody = <EditablePost post={post} onPostUpdated={handlePostUpdated} />;
    } else {
      postBody = <ReadonlyPost post={post} />;
    }

    function handlePostUpdated(updatedPost) {
      setEditableId(null);
      onPostUpdated(updatedPost);
    }

    function handleEditClick() {
      setEditableId(post.id);
    }

    function handleLikeClick() {
      fetch(`api/like_post/${post.id}`, {
        method: "POST",
      })
        .then((response) => response.json())
        .then((updatedPost) => {
          console.log(updatedPost);
          onPostUpdated(updatedPost);
        });
    }
    function handleUnlikeClick() {
      fetch(`api/unlike_post/${post.id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((updatedPost) => {
          console.log(updatedPost);
          onPostUpdated(updatedPost);
        });
    }

    return (
      <Card key={post.id} extraClasses="mb-2">
        <div className="font-medium flex justify-between">
          {usernameLink}{" "}
          {currentUser?.username === post.username && post.id != editableId && (
            <EditButton
              type="button"
              className="ml-2"
              onClick={handleEditClick}
            />
          )}
          {post.id == editableId && (
            <div>
              <SaveButton className="mr-1" form={`edit-post-form-${post.id}`}>
                Save
              </SaveButton>
              <CancelButton onClick={() => setEditableId(null)} />
            </div>
          )}
        </div>
        {postBody}
        <div className="text-sm text-gray-500">{post.date}</div>
        <div className="flex items-center mt-1">
          {!post.liked_by_me && <LikeButton onClick={handleLikeClick} />}
          {post.liked_by_me && <UnLikeButton onClick={handleUnlikeClick} />}
          <span className="text-sm text-gray-600">{post.likes || ""}</span>
        </div>
      </Card>
    );
  });
}

function LikeButton({ ...props }) {
  return (
    <button type="button" {...props}>
      <ThumbsUpIcon className="w-4 text-indigo-500" />
    </button>
  );
}
function UnLikeButton({ ...props }) {
  return (
    <button type="button" {...props}>
      <ThumbsUpFilledIcon className="w-4 text-indigo-500" />
    </button>
  );
}

function EditButton({ ...props }) {
  return (
    <button type="button" {...props}>
      <PencilIcon className="w-4 text-gray-600" />
    </button>
  );
}

function CancelButton({ ...props }) {
  return (
    <button type="button" {...props}>
      <XCircleIcon className="w-4 text-gray-600" />
    </button>
  );
}

function SaveButton({ ...props }) {
  return (
    <button type="submit" {...props}>
      <CheckCircleIcon className={`w-4 text-indigo-600`} />
    </button>
  );
}

function ReadonlyPost({ post }) {
  return <div>{post.posts}</div>;
}

function EditablePost({ post, onPostUpdated }) {
  const [value, setValue] = useState(post.posts);

  function handleSubmit(event) {
    event.preventDefault();
    fetch(`/api/edit_post/${post.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        posts: value,
      }),
    })
      // TODO: Handle errors
      .then((res) => res.json())
      .then((updatedPost) => {
        onPostUpdated(updatedPost);
      });
  }

  function handleChange(event) {
    setValue(event.target.value);
  }

  return (
    <form
      id={`edit-post-form-${post.id}`}
      onSubmit={handleSubmit}
      className="my-1"
    >
      <TextArea value={value} onChange={handleChange} />
    </form>
  );
}
