import React, { useState, useEffect } from "react";
import "./Home.css";
import Nav from "./Nav";
import Footer from "./Footer";
import { Toast } from "react-bootstrap";

const Home = () => {
  const user = JSON.parse(localStorage.getItem("currUser"));
  const [activeIndex, setActiveIndex] = useState(0);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, [user]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === randomImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change slide every 3 seconds

    setShowToast(true); // Show the toast immediately
    setTimeout(() => setShowToast(false), 4000); // Hide the toast after 5 seconds

    return () => clearInterval(interval);
  }, []);

  const randomImages = [
    "https://tse4.mm.bing.net/th?id=OIP.57Bp5K3ef0-oph8lRJ6K8gHaD4&pid=Api&P=0&h=220",
    "https://hdfstutorial.com/wp-content/uploads/2020/08/pdf-editing-tools.png",
    "https://tse4.mm.bing.net/th?id=OIP.tsBT8XkHKlQAUFU8MooapQHaEK&pid=Api&P=0&h=220",
    "https://techviral.net/wp-content/uploads/2020/07/Free-Online-PDF-Editors-1.jpg",
  ];

  return (
    <>
      <Nav />
      <div className="container mt-5">
        <h1 className="text-center mb-3" style={{ fontWeight: "bolder" }}>
          Welcome to Edit <span style={{ color: "#176ede" }}>Masters</span>
        </h1>
        <p className="lead p-3">
          My application aims to provide a comprehensive set of tools for
          editing and managing documents and images. It features a PDF editor
          that allows users to modify text, annotate, merge, split, and rotate
          pages in PDF documents. Additionally, the image editor offers
          functionalities such as cropping, resizing, adding text or images,
          applying filters, basic retouching, and removing backgrounds. The
          application also supports file format conversion, enabling users to
          convert PDF documents to image formats (e.g., JPG, PNG) and vice
          versa, supporting common file formats. These tools are designed to be
          user-friendly and efficient, enhancing the overall editing experience
          for the users.
        </p>
        <div className="carousel-container">
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              {randomImages.map((image, index) => (
                <div
                  key={index}
                  className={`carousel-item ${
                    index === activeIndex ? "active" : ""
                  }`}
                >
                  <img
                    src={image}
                    className="d-block w-100"
                    alt={`Slide ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="row p-4">
          <div className="col-lg-6">
            <p>
              In the age of digital communication and content creation, the
              demand for accessible and user-friendly tools to edit and
              manipulate PDF documents and photos has never been greater.
              Recognizing this need, we present "EditMasters," an innovative
              online platform designed to empower users with the ability to
              effortlessly edit, enhance, and transform their PDFs and photos
              with just a few clicks.
            </p>
            <div className="text-center mt-4">
              <a href="/pdf" className="btn btn-primary me-3">
                Try PDF Editor
              </a>
              <a href="/img" className="btn btn-secondary mx-4">
                Try Image Editor
              </a>
            </div>
          </div>
          <div className="col-lg-6 d-none d-lg-block">
            <img
              src="https://tse4.mm.bing.net/th?id=OIP.GD7BXh0RvA3b5TEM6fX_7wHaE7&pid=Api&P=0&h=220"
              alt="EditMasters"
              className="img-fluid rounded img-large"
            />
          </div>
        </div>
      </div>
      <Footer />
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        style={{
          position: "fixed",
          top: 50,
          right: 20,
          minWidth: 200,
        }}
      >
        <Toast.Header closeButton={false}>
          <i className="fa-solid fa-bell me-2"></i>
          <strong className="me-auto">Notification</strong>
          <small>just now</small>
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowToast(false)}
          ></button>
        </Toast.Header>
        <Toast.Body>Welcome to Edit Master Sir.</Toast.Body>
      </Toast>
    </>
  );
};

export default Home;
