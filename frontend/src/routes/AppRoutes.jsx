import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterUser from "../pages/auth/RegisterUser";
import LoginUser from "../pages/auth/LoginUser";
import RegisterPartner from "../pages/auth/RegisterPartner";
import LoginPartner from "../pages/auth/LoginPartner";
import Home from "../pages/General/Home";
import CreateFood from "../pages/General/CreateFood";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/user/register" element={<RegisterUser />} />
        <Route path="/user/login" element={<LoginUser />} />
        <Route path="/food-partner/register" element={<RegisterPartner />} />
        <Route path="/food-partner/login" element={<LoginPartner />} />
        <Route path="/" element={<Home />} />
        <Route path="/create-food" element={<CreateFood />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
