import React, { useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";

async function register(
  name,
  email,
  password,
  cpassword,
  setLoading,
  setSuccess,
  setError,
  setName,
  setEmail,
  setPassword,
  setCpassword
) {
  if (password === cpassword) {
    const user = {
      name,
      email,
      password,
    };

    setLoading(true);
    try {
      const result = (await axios.post("/api/users/register", user)).data;
      setLoading(false);
      setSuccess(true);

      setName("");
      setEmail("");
      setPassword("");
      setCpassword("");

      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
    console.log(user);
  } else {
    alert("Passwords do not match");
  }
}

function Registerscreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState();

  return (
    <div>
      {loading && <Loader />}
      <div
        style={{ filter: loading ? "blur(4px)" : "none" }}
        className="row justify-content-center mt-5 z-0"
      >
        <div className=" col-md-5">
          {success && <Success message={"Registration was successful"} />}
          {error && <Error />}
          <div className="bs">
            <h1 className="text-center fs-1">Register</h1>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
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
            <input
              type="password"
              className="form-control"
              placeholder="Confirm password"
              value={cpassword}
              onChange={(e) => {
                setCpassword(e.target.value);
              }}
            />
            <button
              className="btn btn-primary mt-3"
              onClick={() =>
                register(
                  name,
                  email,
                  password,
                  cpassword,
                  setLoading,
                  setSuccess,
                  setError,
                  setName,
                  setEmail,
                  setPassword,
                  setCpassword
                )
              }
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registerscreen;
