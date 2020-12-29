import React from "react";
import { Link } from "react-router-dom";

export function Header({ isAuthenticated, user }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Network
      </Link>
      <div>
        <ul className="navbar-nav mr-auto">
          {isAuthenticated && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to={`/profile/${user.username}`}>
                  <strong>{user.username}</strong>
                </Link>
              </li>
            </>
          )}

          <li className="nav-item">
            <Link className="nav-link" to="/">
              All Posts
            </Link>
          </li>
          {isAuthenticated ? (
            <>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Following
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/logout">
                  Log Out
                </a>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <a className="nav-link" href="/login">
                  Log In
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/register">
                  Register
                </a>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
