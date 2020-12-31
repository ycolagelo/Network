import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Posts } from "../components/Posts";
import { Button } from "../components/Button";
import { Title } from "../components/Title";

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

  function handelFollowButtonClick(event) {
    event.preventDefault();
    fetch("api/update_followers", {
      method: "POST",
      body: JSON.stringify({
        following: profileUsername,
      }),
    }).then((response) => {
      if (response.ok) {
        // fetchIsFollowing();
        setIsFollowing(true);
      }
    });
  }

  function handelUnFollowButton(event) {
    event.preventDefault();
    fetch("api/update_followers", {
      method: "DELETE",
      body: JSON.stringify({
        following: profileUsername,
      }),
    }).then((response) => {
      if (response.ok) {
        setIsFollowing(false);
      }
    });
  }
  const currentUsername = currentUser ? currentUser.username : "";

  return (
    <div>
      <Title>{profileData.user.username}</Title>
      <div>Followers: {profileData.followers.length}</div>
      <div>Following: {profileData.following.length}</div>
      {currentUsername !== profileUsername && (
        <>
          {isFollowing && (
            <Button
              buttonStyle="secondary"
              extraClasses="mt-2"
              onClick={handelUnFollowButton}
            >
              Unfollow
            </Button>
          )}
          {!isFollowing && (
            <Button
              buttonStyle="secondary"
              extraClasses="mt-2"
              onClick={handelFollowButtonClick}
            >
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
