import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import { Card } from "./Card";
import { PencilIcon } from "./icons/Pencil";

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

    return (
      <Card key={post.id} extraClasses="mb-2">
        <div className="font-medium flex justify-between">
          {usernameLink}{" "}
          {currentUser?.username === post.username && post.id != editableId && (
            <EditButton
              type="button"
              extraClasses="ml-2"
              onClick={handleEditClick}
            />
          )}
        </div>
        {postBody}
        <div className="text-sm text-gray-500">{post.date}</div>
      </Card>
    );
  });
}

function EditButton({ onClick, extraClasses = "" }) {
  return (
    <button type="button" onClick={onClick}>
      <PencilIcon className={`w-4 text-gray-600 ${extraClasses}`} />
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
    <form onSubmit={handleSubmit}>
      <textarea value={value} onChange={handleChange} />
      <div>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
