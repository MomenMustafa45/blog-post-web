import React from "react";
import { NavLink } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../data/fireBase";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const [user] = useAuthState(auth);

  const logOutHandler = () => {
    signOut(auth);
  };
  return (
    <div
      className="fixed-top border navbar"
      style={{ backgroundColor: "pink" }}
    >
      <NavLink to="/" className="navbar-brand m-auto">
        Home
      </NavLink>
      {user && (
        <>
          <span className="p-2">Welcome {user.displayName}</span>
          <button className="btn-sm btn-primary me-3" onClick={logOutHandler}>
            Logout
          </button>
        </>
      )}
    </div>
  );
};

export default Navbar;
