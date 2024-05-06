import React from "react";
import "./Footer.css";
import { useMediaQuery } from "react-responsive";

const Footer = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  return (
    <>
      {isMobile ? (
        <footer className="Footer mt-5 container-fluid text-center text-lg-start text-light bg-dark">
          <div>
            <div className="m-3">
              <hr />
            </div>
            <section className="pt-0">
              <div className="container-fluid">
                <div className="row align-items-center justify-content-between">
                  <div className="col-md-7 col-lg-8 text-center text-md-start order-2 order-md-1">
                    <div
                      id="copy"
                      className="CopyRight mx-1"
                      style={{ fontSize: "0.9rem", color: "white" }}
                    >
                      &copy;2024 Edit Masters. All rights reserved
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-4 mt-3 mt-md-0">
                    <div
                      id="foot-end"
                      className="Foot-end"
                      style={{ fontSize: "0.9rem", color: "white" }}
                    >
                      <div className="mx-5">Privacy & Policy</div>
                      <div>Terms & Conditions</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </footer>
      ) : (
        <footer className="Footer mt-5 container-fluid text-lg-start text-light bg-dark">
          <div>
            <div className="m-3">
              <hr />
            </div>

            <section className="pt-0">
              <div className="container-fluid">
                <div className="row align-items-center justify-content-evenly">
                  <div className="col-md-7 col-lg-8 order-2 order-md-1">
                    <div
                      id="copy"
                      className="CopyRight"
                      style={{ fontSize: "1rem", color: "white" }}
                    >
                      &copy;2024 Edit Masters. All rights reserved
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-4 mt-3 mt-md-0 order-1 order-md-2">
                    <div
                      id="foot-end"
                      className="Foot-end d-flex justify-content-md-end"
                      style={{ fontSize: "0.9rem", color: "white" }}
                    >
                      <div className="mx-5">Privacy & Policy</div>
                      <div>Terms & Conditions</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </footer>
      )}
    </>
  );
};

export default Footer;
