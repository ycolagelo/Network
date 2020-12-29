import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Posts } from "../components/Posts";

export function ProfilePage() {
  const [profileData, setProfileData] = useState({
    followers: [],
    following: [],
    posts: [],
    user: { username: "" },
  });
  const { username } = useParams();

  function fetchProfile() {
    fetch(`api/profile/${username}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProfileData(data);
      });
  }

  useEffect(() => {
    fetchProfile();
  }, [username]);

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
