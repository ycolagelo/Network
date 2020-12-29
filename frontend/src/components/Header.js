import React from "react";
import { Pages } from "../constants";

export function Header({ isAuthenticated, user, onPageChange }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a
        className="navbar-brand"
        href="#"
        onClick={() => onPageChange(Pages.HOME)}
      >
        Network
      </a>
      <div>
        <ul className="navbar-nav mr-auto">
          {isAuthenticated && (
            <>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#"
                  onClick={() => onPageChange(Pages.PROFILE)}
                >
                  <strong>{user.username}</strong>
                </a>
              </li>
              {/* <li>
                <a className="nav-link" href="#" onClick={() => Pages.NEWPOST}>
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-pencil-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"
                    />
                  </svg>
                </a>
              </li> */}
            </>
          )}

          <li className="nav-item">
            <a
              className="nav-link"
              href="#"
              onClick={() => onPageChange(Pages.ALL_POSTS)}
            >
              All Posts
            </a>
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
