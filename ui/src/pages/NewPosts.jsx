import React from "react";

export function NewPost() {
  return (
    <div>
      <h2>New Post</h2>
      <form id="post-form">
        <div className="form-group">
          <textarea
            className="form-control"
            id="post-info"
            placeholder="Write Post"
          ></textarea>
          <button type="submit" id="button" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
