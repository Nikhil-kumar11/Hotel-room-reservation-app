import React from "react";
import {} from "react-bootstrap";
import { Link } from "react-router-dom";

function logout(navigate) {
  localStorage.removeItem("currentUser");
  window.location.href = "/login";
}

function Navbar() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  return (
    <div>
      <nav class="navbar navbar-expand-lg ">
        <Link to="/home" class="navbar-brand">
          Airbnb
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon">
            <i class="fa fa-bars" style={{ color: "white" }}></i>
          </span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-5">
            {user ? (
              <div class="dropstart">
                <button
                  class="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {user.name}
                  <i class="fa fa-user ms-2"></i>
                </button>
                <ul class="dropdown-menu">
                  <li>
                    <button class="dropdown-item">Bookings</button>
                  </li>
                  <li>
                    <button class="dropdown-item" onClick={logout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <li class="nav-item active">
                  <a class="nav-link" href="/register">
                    Register
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/login">
                    Login
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}
export default Navbar;
