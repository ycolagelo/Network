import React, { useState, useEffect } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import { Header } from "./components/Header";
import { AllPostsPage } from "./pages/AllPosts";
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
    <Router>
      <div className="font-sans text-gray-900">
        <Header isAuthenticated={isAuthenticated} user={userInfo} />
        <div className="container mx-auto">
          <Switch>
            <Route path="/profile/:profileUsername">
              <ProfilePage currentUser={userInfo} />
            </Route>
            <Route path="/">
              <AllPostsPage isAuthenticated={isAuthenticated} />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
