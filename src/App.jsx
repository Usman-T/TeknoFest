import { Route, Routes, useNavigate } from "react-router-dom";
import Register from "./components/custom/Register";
import Login from "./components/custom/Login";
import { Toaster } from "react-hot-toast";
import Home from "./components/custom/Home";
import Competitions from "./components/custom/Competitions";
import CompetitionDetails from "./components/custom/CompetitionDetails";
import { useEffect } from "react";
import AboutUs from "./components/custom/AboutUs";

const App = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!localStorage.getItem("mehtab-user-token")) {
      navigate("/login");
    }
  }, []);
  return (
    <div className="">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/aboutus" element={<AboutUs/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/competitions" element={<Competitions />} />
        <Route path="/competitions/:id" element={<CompetitionDetails />} />
      </Routes>
      <Toaster></Toaster>
    </div>
  );
};

export default App;
