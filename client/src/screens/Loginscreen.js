import React, { useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";

async function login(email, password, setLoading, setError) {
  const user = {
    email,
    password,
  };

  setLoading(true);
  try {
    const result = (await axios.post("/api/users/login", user)).data;
    setLoading(false);
    localStorage.setItem("currentUser", JSON.stringify(result));
    window.location.href = "/home";
  } catch (error) {
    setLoading(false);
    setError(true);
    console.log(error);
  }

  console.log(user);
}

function Loginscreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  return (
    <div>
      {loading && <Loader />}

      <div className="row justify-content-center mt-5">
        <div className=" col-md-5">
          {error && <Error message="Invalid Credentials" />}
          <div className="bs">
            <h1 className="text-center fs-1">Login</h1>

            <input
              type="text"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <button
              className="btn btn-primary mt-3"
              onClick={() => login(email, password, setLoading, setError)}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loginscreen;
