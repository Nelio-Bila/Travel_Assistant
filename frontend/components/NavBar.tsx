import { AuthContext } from "contexts/authcontext";
import Link from "next/link";
import React, { useContext } from "react";

const NavBar = () => {
  const { user, signOut } = useContext(AuthContext);
  return (
    <nav
      className="mb-5 shadow navbar h-72 bl-0 navbar-expand-lg lucid sticky-top"
      id="navbarNav"
    >
      <div className="container ">
        <Link className="navbar-brand" href="/">
          Travel Assistant
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          

          <ul className="navbar-nav ms-auto">
            {user ? (
              <li className="nav-item dropdown">
                <Link
                  id="navbarDropdown"
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  v-pre
                >
                  {user?.email}
                </Link>

                <div
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdown"
                >
                  <button className="dropdown-item" onClick={() => signOut()}>
                    Logout
                  </button>
                </div>
              </li>
            ) : (
              <>
              <li className="nav-item">
                <Link className="nav-link" href={`login`} >Sign In</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href={`signup`} >Sign Up</Link>
              </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
