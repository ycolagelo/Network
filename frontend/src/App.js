import React, { useState, useEffect } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { Pages } from "./constants";
import { HomePage } from "./pages/Home";
import { AllPostsPage } from "./pages/AllPosts";
import { ProfilePage } from "./pages/profile";

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
    <div className="font-sans text-gray-900">
      <Header
        isAuthenticated={userInfo !== null}
        user={userInfo}
        onPageChange={handlePageChange}
      />
      <div className="container mx-auto">
        {page === Pages.HOME && <HomePage />}
        {page === Pages.ALL_POSTS && (
          <AllPostsPage isAuthenticated={userInfo !== null} />
        )}
        {page == Pages.PROFILE && <ProfilePage />}
      </div>
    </div>
  );
}

export default App;
