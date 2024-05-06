import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import Imgtopdf from "./Imgtopdf";
import PdftoImg from "./PdftoImg";

const FileConversion = () => {
  return (
    <>
      <Nav />
      <Imgtopdf />
      <PdftoImg/>
      <div style={{height:"12rem"}}> </div>
      <Footer />
    </>
  );
};

export default FileConversion;
