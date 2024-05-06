import React, { useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert2";

const RegisterScreen = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");

  const register = async (e) => {
    e.preventDefault();
    if (name.length > 3 && password.length > 3 && password === cpassword) {
      const user = {
        name,
        email,
        password,
        cpassword,
      };
      try {
        const response = await fetch(
          "http://localhost:5000/api/users/register",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
          }
        );
        if (response.status === 200) {
          setname("");
          setemail("");
          setpassword("");
          setcpassword("");

          console.log("Registration successful");
          swal
            .fire({
              title: "Congratulations",
              text: "User Successfully Registered",
              icon: "success",
            })
            .then((result) => {
              if (result.isConfirmed) {
                window.location.href = "/login";
              }
            });
        } else {
          swal.fire({ title: "OOPS", text: "Email Already in use" });
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      swal.fire({
        title: "OOPS",
        text: "Something Went Wrong, Length should be 4 characters or more and add correct Info",
        icon: "error",
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
      <div id="reg">
        <div className="container d-flex justify-content-center mt-5">
          <div
            id="form"
            className="col-md-8 mb-1"
            style={{ marginTop: "2rem" }}
          >
            <h1 className="text-center">Sign up</h1>
            <form className="d-flex flex-column">
              <input
                type="text"
                placeholder="Name"
                className="m-1 form-control"
                value={name}
                onChange={(e) => setname(e.target.value)}
                id="name"
                minLength={4}
                required
              />
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
              <input
                type="password"
                placeholder="Confirm Password"
                className="m-1 form-control"
                value={cpassword}
                onChange={(e) => setcpassword(e.target.value)}
                id="cpassword"
                minLength={4}
                required
              />

              <button
                type="submit"
                className="btn btn-dark m-1 mt-3"
                onClick={register}
              >
                Submit
              </button>

              <button className="btn btn-link mt-2" onClick={forgotPassword}>
                Forgot Password?
              </button>

              <div className="text-center mt-2">
                <button className="btn btn-danger mx-2" onClick={redirectToGmail}>
                  <i className="fab fa-google mx-1"></i> Sign up with Gmail
                </button>
                <button className="btn btn-primary mx-2" onClick={redirectToFacebook}>
                  <i className="fab fa-facebook mx-1"></i> Sign up with Facebook
                </button>
              </div>
              <p className="m-1 mt-2 text-center mt-3">
                Already have an account <Link to="/login">Sign in</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterScreen;
