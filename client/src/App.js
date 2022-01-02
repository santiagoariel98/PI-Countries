import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// components
import LandingPage from "./components/LandingPage/LandingPage.js";
import Home from "./components/Home/Home.jsx";
import CardDetail from "./components/CardDetail/CardDetail.js";
import FormActivity from "./components/FormActivity/FormActivity.jsx";
import Errors from "./components/Error/Error.js";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/country/:id" element={<CardDetail />} />
        <Route exact path="/Activity" element={<FormActivity />} />
        <Route element={<Errors />} />
      </Routes>
    </div>
  );
}

export default App;
