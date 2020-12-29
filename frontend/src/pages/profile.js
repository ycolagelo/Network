import React, { useState, useEffect } from "react";
import { Posts } from "../components/Posts";

export function ProfilePage() {
  const [profileData, setProfileData] = useState({
    followers: [],
    following: [],
    posts: [],
    user: { username: "" },
  });

  function fetchProfile() {
    fetch("api/profile/1")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProfileData(data);
      });
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-medium">{profileData.user.username}</h1>

      <div>Followers: {profileData.followers.length}</div>

      <div>Following: {profileData.following.length}</div>

      <h2>Posts:</h2>
      <Posts posts={profileData.posts} />
    </div>
  );
}
