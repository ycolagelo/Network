import React, { useState, useEffect } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import { Header } from "./components/Header";
import { AllPostsPage } from "./pages/AllPosts";
import { FollowingPage } from "./pages/Following";
import { ProfilePage } from "./pages/profile";

function App() {
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

  const isAuthenticated = userInfo !== null;

  return (
    <div className="font-sans text-gray-900 box-border">
      <Router>
        <Header isAuthenticated={isAuthenticated} user={userInfo} />
        <div className="container mx-auto px-4">
          <Switch>
            <Route path="/" exact={true}>
              <AllPostsPage isAuthenticated={isAuthenticated} />
            </Route>
            <Route path="/profile/:profileUsername">
              <ProfilePage currentUser={userInfo} />
            </Route>
            <Route path="/following-posts">
              <FollowingPage />
            </Route>

            {/* 
              This one will show if there is no above match (i.e. route not found) 
              It should always be the last one
            */}
            <Route path="/">No page found</Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
