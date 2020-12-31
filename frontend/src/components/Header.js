import React from "react";
import { Link } from "react-router-dom";

function NavItem({ children }) {
  return <div className="px-2">{children}</div>;
}

function Brand({ children }) {
  return <div className="px-2 font-bold text-gray-300">{children}</div>;
}

const LINK_CLASSES = "text-gray-100 hover:text-gray-300";

function StyledLink({ children, to, extraClasses = "" }) {
  return (
    <Link className={`${LINK_CLASSES} ${extraClasses}`} to={to}>
      {children}
    </Link>
  );
}

function StyledA({ children, href, extraClasses = "" }) {
  return (
    <a href={href} className={`${LINK_CLASSES} ${extraClasses}`}>
      {children}
    </a>
  );
}

export function Header({ isAuthenticated, user }) {
  // grid grid-cols-2
  return (
    <nav className="p-4 flex justify-between bg-indigo-800">
      {/* Left Side */}
      <div className="flex list-none">
        <Brand>
          <Link to="/">Network</Link>
        </Brand>
        {isAuthenticated && (
          <NavItem>
            <StyledLink
              extraClasses="font-medium"
              to={`/profile/${user.username}`}
            >
              {user.username}
            </StyledLink>
          </NavItem>
        )}
        <NavItem>
          <StyledLink to="/">All Posts</StyledLink>
        </NavItem>
        {isAuthenticated && (
          <NavItem>
            <StyledLink to={"/following-posts"}>Following</StyledLink>
          </NavItem>
        )}
      </div>

      {/* Right Side */}
      <div className="flex justify-end">
        {isAuthenticated ? (
          <NavItem>
            <StyledA href="/logout">Log Out</StyledA>
          </NavItem>
        ) : (
          <>
            <NavItem>
              <StyledA href="/login">Log In</StyledA>
            </NavItem>
            <NavItem>
              <StyledA href="/register">Register</StyledA>
            </NavItem>
          </>
        )}
      </div>
    </nav>
  );
}
