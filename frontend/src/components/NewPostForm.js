import React, { useState } from "react";

export function NewPostForm() {
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
      .then((posts) => {
        console.log("new post:", posts);
      });
  }

  function handleNewPostChange(event) {
    setNewPostValue(event.target.value);
  }

  return (
    <div>
      <h5>New Post</h5>
      <form className="form" onSubmit={handleSubmit}>
        <textarea
          className="form-control"
          name="new-post"
          value={newPostValue}
          onChange={handleNewPostChange}
          placeholder="New Post"
        />
        <button className="btn btn-primary" type="submit">
          Post
        </button>
      </form>
    </div>
  );
}
