import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Img from "./Components/Img";
import Pdf from "./Components/Pdf";
import Home from "./Components/Home";
import RegisterScreen from "./Screens/RegisterScreen";
import LoginScreen from "./Screens/LoginScreen";
import FileConversion from "./Components/FileConversion";
import Drive from "./Components/Drive";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/login" exact element={<LoginScreen />} />
        <Route path="/img" element={<Img />} />
        <Route path="/pdf" element={<Pdf />} />
        <Route path="/fileConversion" element={<FileConversion />} />
        <Route path="/drive" element={<Drive />} />
      </Routes>
    </Router>
  );
}

export default App;
