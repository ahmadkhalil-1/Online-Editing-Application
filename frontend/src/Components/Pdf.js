import Nav from "./Nav";
import Footer from "./Footer";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
// import * as pdfjs from "pdfjs-dist/build/pdf";

const Pdf = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pdfData, setPdfData] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [files, setFiles] = useState([]);

  var pdfjs = window["pdfjs-dist/build/pdf"];
  pdfjs.GlobalWorkerOptions.workerSrc = "./assets/js/pdf.worker.js";

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPdfData(null);
    setImageSrc(null);
    if (selectedFile.type === "application/pdf") {
      renderPdf(selectedFile);
    } else if (selectedFile.type.startsWith("image/")) {
      renderImage(selectedFile);
    }
  };

  const handleUpload = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      await axios.post("http://localhost:5000/upload", formData);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "File uploaded successfully",
        showConfirmButton: false,
        timer: 1500
      });
      setFile('')
      showFiles();
    } catch (error) {
      console.error("Error uploading file:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to upload file",
        text: error.message
      });
    }
    setLoading(false);
  };


  const renderPdf = async (file) => {
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const data = new Uint8Array(reader.result);
        const pdf = await pdfjs.getDocument({ data }).promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.getElementById("pdfCanvas");
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        await page.render(renderContext);
        setPdfData(canvas.toDataURL("image/jpeg"));
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error("Error rendering PDF:", error);
    }
  };

  const showFiles = async () => {
    try {
      const response = await axios.get("http://localhost:5000/files");
      setFiles(response.data);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  useEffect(() => {
    showFiles();
  }, []);

  const renderImage = async (file) => {
    try {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error rendering image:", error);
    }
  };

  return (
    <>
      <Nav />
      <div className="container mt-5">
        <h1 className="text-center mb-5">Online PDF Editor</h1>
        <input type="file" onChange={handleFileChange} />
        <button
          className="btn btn-primary ms-3"
          onClick={handleUpload}
          disabled={!file || loading}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
        {/* {pdfData && file.type === "application/pdf" && (
          // <img src={pdfData} alt="PDF Preview" className="img-fluid mt-3" />
        )} */}
        {imageSrc && file.type.startsWith("image/") && (
          <img src={imageSrc} alt="Image Preview" className="img-fluid mt-3" />
        )}
        <canvas id="pdfCanvas" style={{ display: "none" }}></canvas>
      </div>
      <div className="container mt-5">
        <h2>Files</h2>
        <ul className="list-unstyled d-flex flex-wrap">
          {files.map((file) => (
            <li key={file._id} className="me-3 mb-3">
              <a
                href={`http://localhost:5000/${file.path}`}
                download
                className="text-decoration-none"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png"
                  alt="PDF Icon"
                  width={80}
                  height={80}
                />
                <br />
                {file.name}
              </a>
            </li>
          ))}

        </ul>
      </div>
      <Footer />
    </>
  );
};

export default Pdf;
