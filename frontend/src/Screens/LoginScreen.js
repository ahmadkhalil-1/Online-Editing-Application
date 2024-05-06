import React, { useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert2";

const LoginScreen = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const login = async (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };
    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      if (response.status === 200) {
        setemail("");
        setpassword("");

        localStorage.setItem("currUser", JSON.stringify(data));

        setTimeout(() => (window.location.href = "/"), 2000);
      } else {
        console.error("Login failed");
        swal.fire({
          title: "OOPS",
          text: "Invalid Credentials",
        });
      }
    } catch (error) {
      console.error("An error occurred:", error);
      swal.fire({
        title: "OOPS",
        text: "Invalid Credentials",
      });
    }
  };

  const redirectToGmail = () => {
    window.location.href = "https://mail.google.com/";
  };

  const redirectToFacebook = () => {
    window.location.href = "https://www.facebook.com/";
  };

  const forgotPassword = () => {
    window.location.href = "https://accounts.google.com/signin/v2/recoveryidentifier";
  };

  return (
    <>
      <div id="login">
        <div
          className="container d-flex justify-content-center"
          style={{ marginTop: "4rem" }}
        >
          <div id="form" className="col-md-7" style={{ marginTop: "3rem" }}>
            <h1 className="text-center">Sign in</h1>

            <form className="d-flex flex-column mb-5">
              <input
                type="text"
                placeholder="Email"
                className="m-1 form-control"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                id="email"
                minLength={4}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="m-1 form-control"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                id="password"
                minLength={4}
                required
              />
              <button
                type="submit"
                className="btn btn-dark mt-3 m-1"
                onClick={login}
              >
                Submit
              </button>
              <button className="btn btn-link" onClick={forgotPassword}>
                Forgot Password?
              </button>
              <div className="text-center mt-2">
                <button
                  className="btn btn-danger mx-2"
                  onClick={redirectToGmail}
                >
                  <i className="fab fa-google"></i> Sign in with Gmail
                </button>
                <button
                  className="btn btn-primary mx-2"
                  onClick={redirectToFacebook}
                >
                  <i className="fab fa-facebook"></i> Sign in with Facebook
                </button>
              </div>
              <p className="m-1 mt-3 text-center">
                Not a member <Link to="/register">Sign up now</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginScreen;
