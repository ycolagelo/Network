import React from "react";

const data = [
  {
    id: 1,
    username: "Evon",
    posts: "Hi I am having a nice day",
    date: "Dec 15 2020, 12: 00 am",
    likes: 0,
  },
  {
    id: 2,
    username: "Pat",
    posts: "I am fine",
    date: "Dec 15 2020, 12: 00 am",
    likes: 0,
  },
  {
    id: 3,
    username: "Evon",
    posts: "Come with me",
    date: "Dec 15 2020, 12: 00 am",
    likes: 0,
  },
];

export function HomePage() {
  function handleUsernameClick(event) {
    alert("clicked");
  }
  return (
    <div>
      <h2>Title</h2>
      {data.map((d) => {
        return (
          <div>
            <ul>
              <li>
                <a href="#" onClick={handleUsernameClick}>
                  <strong>{d.username}</strong>
                </a>
              </li>
              <li>{d.posts}</li>
              <li>{d.date}</li>
            </ul>
          </div>
        );
      })}
    </div>
  );
}
