import React, { useState, useEffect } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { Pages } from "./constants";
import { HomePage } from "./pages/Home";
import { AllPostsPage } from "./pages/AllPosts";

function App() {
  const [page, setPage] = useState(Pages.ALL_POSTS);
  const [userInfo, setUserInfo] = useState(null);

  function getUserInfo() {
    fetch("/api/user_info")
      .then((response) => response.json())
      .then((user) => {
        setUserInfo(user);
      });
  }
  useEffect(() => {
    getUserInfo();
  }, []);

  function handlePageChange(page) {
    setPage(page);
  }

  return (
    <div>
      <Header
        isAuthenticated={userInfo !== null}
        user={userInfo}
        onPageChange={handlePageChange}
      />
      <div>Main Content</div>
      {page === Pages.HOME && <HomePage />}
      {page === Pages.ALL_POSTS && <AllPostsPage />}
    </div>
  );
}

export default App;
