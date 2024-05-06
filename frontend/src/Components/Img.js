import React, { useState, useRef, useEffect } from "react";
import "./Img.css";
import Footer from "./Footer";
import Nav from "./Nav";

const ImageEditor = () => {
  const user = JSON.parse(localStorage.getItem("currUser"));

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, [user]);

  const fileInput = useRef(null);
  const [brightness, setBrightness] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [inversion, setInversion] = useState(0);
  const [grayscale, setGrayscale] = useState(0);
  const [rotate, setRotate] = useState(0);
  const [flipHorizontal, setFlipHorizontal] = useState(1);
  const [flipVertical, setFlipVertical] = useState(1);
  const [text, setText] = useState("");
  const [fontSize, setFontSize] = useState(20);
  const [fontColor, setFontColor] = useState("#000000");
  const [textX, setTextX] = useState(0);
  const [textY, setTextY] = useState(0);

  const handleLoadImage = () => {
    const file = fileInput.current.files[0];
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setRotate(0);
    setFlipHorizontal(1);
    setFlipVertical(1);
    setBrightness(100);
    setSaturation(100);
    setInversion(0);
    setGrayscale(0);
    setText("");
    setFontSize(20);
    setFontColor("#000000");
    setTextX(0);
    setTextY(0);
    document.querySelector(".container").classList.remove("disable");
    document.querySelector(".preview-img img").src = objectUrl;
  };

  const applyFilter = () => {
    const previewImg = document.querySelector(".preview-img img");
    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
  };

  const handleFilterChange = (filter, value) => {
    switch (filter) {
      case "brightness":
        setBrightness(value);
        break;
      case "saturation":
        setSaturation(value);
        break;
      case "inversion":
        setInversion(value);
        break;
      case "grayscale":
        setGrayscale(value);
        break;
      default:
        break;
    }
    applyFilter();
  };

  const handleRotate = (angle) => {
    setRotate(angle);
    applyFilter();
  };

  const handleFlip = (axis) => {
    if (axis === "horizontal") {
      setFlipHorizontal(flipHorizontal === 1 ? -1 : 1);
    } else {
      setFlipVertical(flipVertical === 1 ? -1 : 1);
    }
    applyFilter();
  };

  const handleResetFilter = () => {
    setBrightness(100);
    setSaturation(100);
    setInversion(0);
    setGrayscale(0);
    setRotate(0);
    setFlipHorizontal(1);
    setFlipVertical(1);
    setText("");
    applyFilter();
  };

  const handleSaveImage = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const previewImg = document.querySelector(".preview-img img");
    canvas.width = previewImg.naturalWidth;
    canvas.height = previewImg.naturalHeight;
    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    if (rotate !== 0) {
      ctx.rotate((rotate * Math.PI) / 180);
    }
    ctx.scale(flipHorizontal, flipVertical);
    ctx.drawImage(
      previewImg,
      -canvas.width / 2,
      -canvas.height / 2,
      canvas.width,
      canvas.height
    );

    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = fontColor;
    ctx.fillText(text, textX, textY);
    const link = document.createElement("a");
    link.download = "image.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <>
      <Nav />
      <div className="container disable">
        <h2 style={{ fontWeight: "bolder" }}>Online Image Editor</h2>
        <div className="row">
          <div className="col-md-8">
            <div className="editor-panel">
              <div className="filter">
                <label className="title">Filters</label>
                <div className="slider">
                  <div className="filter-info">
                    <p className="name">Brightness</p>
                    <p className="value">{brightness}%</p>
                  </div>
                  <input
                    type="range"
                    value={brightness}
                    min="0"
                    max="200"
                    onChange={(e) =>
                      handleFilterChange("brightness", e.target.value)
                    }
                  />
                  <div className="filter-info">
                    <p className="name">Saturation</p>
                    <p className="value">{saturation}%</p>
                  </div>
                  <input
                    type="range"
                    value={saturation}
                    min="0"
                    max="200"
                    onChange={(e) =>
                      handleFilterChange("saturation", e.target.value)
                    }
                  />
                  <div className="filter-info">
                    <p className="name">Inversion</p>
                    <p className="value">{inversion}%</p>
                  </div>
                  <input
                    type="range"
                    value={inversion}
                    min="0"
                    max="100"
                    onChange={(e) =>
                      handleFilterChange("inversion", e.target.value)
                    }
                  />
                  <div className="filter-info">
                    <p className="name">Grayscale</p>
                    <p className="value">{grayscale}%</p>
                  </div>
                  <input
                    type="range"
                    value={grayscale}
                    min="0"
                    max="100"
                    onChange={(e) =>
                      handleFilterChange("grayscale", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="rotate">
                <label className="title">Rotate & Flip</label>
                <div className="options">
                  <button onClick={() => handleRotate(-90)}>Rotate Left</button>
                  <button onClick={() => handleRotate(90)}>Rotate Right</button>
                  <button onClick={() => handleFlip("horizontal")}>
                    Flip Horizontal
                  </button>
                  <button onClick={() => handleFlip("vertical")}>
                    Flip Vertical
                  </button>
                </div>
              </div>
              <div className="text">
                <label className=" mx-1 title">Add Text</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <input
                  type="number"
                  className="form-control mt-2"
                  placeholder="Font Size"
                  value={fontSize}
                  onChange={(e) => setFontSize(e.target.value)}
                />
                <input
                  type="color"
                  className="form-control mt-2"
                  value={fontColor}
                  onChange={(e) => setFontColor(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="preview-img">
              <img src="image-placeholder.svg" alt="Preview" />
              {text && (
                <p
                  className="added-text"
                  style={{
                    left: `${textX}px`,
                    top: `${textY}px`,
                    fontSize: `${fontSize}px`,
                    color: fontColor,
                  }}
                >
                  {text}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="controls">
          <button
            className="reset-filter btn btn-primary"
            onClick={handleResetFilter}
          >
            Reset Filters
          </button>
          <div className="row">
            <input
              type="file"
              className="file-input"
              accept="image/*"
              ref={fileInput}
              hidden
              onChange={handleLoadImage}
            />
            <div>
              {" "}
              <button
                className="choose-img btn btn-primary"
                onClick={() => fileInput.current.click()}
              >
                Choose Image
              </button>
              <button
                className="mx-2 save-img btn btn-success"
                onClick={handleSaveImage}
              >
                Save Image
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ImageEditor;
