import "./App.css";
import Login from "./Component/Login";

import Registration from "./Component/Registration";
import { BrowserRouter, Route, Routes } from "react-router-dom";



function App() {
  return (
    <BrowserRouter>
    <Routes>
   
      <Route  path="/" element={<Login/>} />
      <Route path="/registration" element={<Registration/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
