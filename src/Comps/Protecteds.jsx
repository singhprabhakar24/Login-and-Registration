import React from "react";

import { Navigate, Outlet } from "react-router-dom";

function Protecteds() {
  const isLogged = localStorage.getItem("id");

  return isLogged ? <Outlet /> : <Navigate to="/" />;
}

export default Protecteds;
