import React, { useState } from "react";
import { Button } from "./Button";

export function NewPostForm({ onNewPostCreated }) {
  const [newPostValue, setNewPostValue] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    fetch("api/new_post", {
      method: "POST",
      body: JSON.stringify({
        posts: newPostValue,
      }),
    })
      .then((res) => res.json())
      .then((post) => {
        onNewPostCreated(post);
        setNewPostValue("");
      });
  }

  function handleNewPostChange(event) {
    setNewPostValue(event.target.value);
  }

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <textarea
          required
          className="form-control"
          name="new-post"
          value={newPostValue}
          onChange={handleNewPostChange}
          placeholder="New Post"
        />
        <Button buttonStyle="primary" extraClasses="mt-2" type="submit">
          Post
        </Button>
      </form>
    </div>
  );
}
