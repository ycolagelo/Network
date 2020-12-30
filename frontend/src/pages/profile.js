import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Posts } from "../components/Posts";
import { Button } from "../components/Button";

export function ProfilePage({ currentUser }) {
  const { profileUsername } = useParams();

  const [profileData, setProfileData] = useState({
    followers: [],
    following: [],
    posts: [],
    user: { username: "" },
  });
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    fetchProfile();
    fetchIsFollowing();
  }, [profileUsername]);

  function fetchIsFollowing() {
    fetch(`api/is_following/${profileUsername}`)
      .then((response) => response.json())
      .then((data) => {
        setIsFollowing(data.is_following);
      });
  }

  function fetchProfile() {
    fetch(`api/profile/${profileUsername}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProfileData(data);
      });
  }

  const currentUsername = currentUser ? currentUser.username : "";

  return (
    <div>
      <h1 className="text-2xl font-medium">{profileData.user.username}</h1>
      <div>Followers: {profileData.followers.length}</div>
      <div>Following: {profileData.following.length}</div>
      {currentUsername !== profileUsername && (
        <>
          {isFollowing && (
            <Button buttonStyle="secondary" extraClasses="mt-2" type="submit">
              Unfollow
            </Button>
          )}
          {!isFollowing && (
            <Button buttonStyle="secondary" extraClasses="mt-2" type="submit">
              Follow
            </Button>
          )}
        </>
      )}
      <h2>Posts:</h2>
      <Posts posts={profileData.posts} usernameToNotLink={profileUsername} />
    </div>
  );
}
