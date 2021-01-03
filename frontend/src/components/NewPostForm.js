import React, { useState } from "react";
import { Button } from "./Button";
import { TextArea } from "./forms/TextArea";

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
      .then((res) => {
        // TODO: We can move this 401 redirect to login
        // logic into a helper function instead of
        // doing it manually every time we fetch
        if (res.status === 401) {
          // 401 error means unauthenticated
          window.location.href = "/login";
          throw new Error("Request Failed due to not being logged in");
        }
        return res.json();
      })
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
      <form className="" onSubmit={handleSubmit}>
        <div className="w-full">
          <TextArea
            required
            className="w-full h-20"
            name="new-post"
            value={newPostValue}
            onChange={handleNewPostChange}
            placeholder="New Post"
          />
        </div>
        <Button buttonStyle="primary" extraClasses="mt-2" type="submit">
          Post
        </Button>
      </form>
    </div>
  );
}
