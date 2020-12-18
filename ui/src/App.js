import React, { useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { Pages } from "./constants";
import { HomePage } from "./pages/Home";
import { AllPostsPage } from "./pages/AllPosts";

function App() {
  const isAuthenticated = true;
  const user = {
    username: "ycolangelo",
  };

  const [page, setPage] = useState(Pages.HOME);

  function handlePageChange(page) {
    setPage(page);
  }

  return (
    <div>
      <Header
        isAuthenticated={isAuthenticated}
        user={user}
        onPageChange={handlePageChange}
      />
      <div>Main Content</div>
      {page === Pages.HOME && <HomePage />}
      {page === Pages.ALL_POSTS && <AllPostsPage />}
    </div>
  );
}

export default App;
