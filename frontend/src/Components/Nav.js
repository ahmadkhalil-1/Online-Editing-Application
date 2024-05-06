import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
  const user = JSON.parse(localStorage.getItem("currUser"));
  const logout = () => {
    localStorage.removeItem("currUser");
    window.location.href = "/login";
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-2 ">
        <div className="container-fluid">
          <Link className="navbar-brand" style={{ fontWeight: "bold" }} to="/">
            EditMasters
          </Link>
          <button
            className="navbar-toggler collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="toggler-icon top-bar"></span>
            <span className="toggler-icon middle-bar"></span>
            <span className="toggler-icon bottom-bar"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="ul navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link text-light" to="/">
                  Home Page
                </Link>
              </li>
              <li className="nav-item mx-1">
                <Link className="nav-link text-light" to="/pdf">
                  Online Pdf Editor
                </Link>
              </li>
              <li className="nav-item mx-1">
                <Link className="nav-link text-light" to="/img">
                  Online Image Editor
                </Link>
              </li>
              <li className="nav-item mx-1">
                <Link className="nav-link text-light" to="/fileConversion">
                  File Conversion
                </Link>
              </li>
              <li className="nav-item mx-1">
                <Link className="nav-link text-light" to="/drive">
                  Upload on Drive
                </Link>
              </li>
            </ul>

            <ul className="navbar-nav">
              {user ? (
                <li className="nav-item dropdown">
                  <button
                    className="btn btn-dark text-white custom-dropdown-button dropdown-toggle"
                    type="button"
                    id="navbarDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fa-solid fa-user mx-1"></i> {user.name}
                  </button>
                  <ul
                    className="dropdown-menu bg-dark"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <Link
                        to="/logout"
                        className="dropdown-item text-light"
                        onClick={logout}
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                </li>
              ) : (
                <>
                  {/* <li className="nav-item">
                      <Link to="/register" className="nav-link text-light">
                        <i className="fa-solid fa-address-card mx-2"></i>
                        Register
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/login" className="nav-link text-light">
                        <i className="fa-solid fa-right-to-bracket mx-2"></i>
                        Login
                      </Link>
                    </li> */}
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
