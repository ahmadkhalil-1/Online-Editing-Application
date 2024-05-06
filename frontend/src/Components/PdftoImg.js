import React, { useState } from "react";
import { Grid } from "@mui/material";
import FileInput from "../Components/file-input";
import "./PdftoImag.css";
import FileConverter from "../Components/file-converter";

export const primary = "#176ede";

function PdftoImg() {
  const [pdfFile, setPdfFile] = useState(null);
  return (
    <div style={{ height: "80dvh" }}>
      <Grid container className="d-flex" sx={{ py: 4, px: 6 }}>
        <Grid item className="box">
          <FileInput onFileChange={(file) => setPdfFile(file)} />
        </Grid>
        {pdfFile && (
          <Grid item sx={{ width: "100%" }}>
            <FileConverter
              pdfUrl={URL.createObjectURL(pdfFile)}
              fileName={pdfFile.name}
            />
          </Grid>
        )}
      </Grid>
      <div className="mb-5"></div>
    </div>
  );
}

export default PdftoImg;
