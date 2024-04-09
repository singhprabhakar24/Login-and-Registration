import "./App.css";
import Login from "./Comps/Login";

import Registration from "./Comps/Registration";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Comps/Navbar";
import Protecteds from "./Comps/Protecteds";
import { useState } from "react";



function App() {
  // const [isLogged, setIsLogged] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/Login" element={<Login />} />
        
        {/* <Route path="/registration" element={<Registration />} /> */}

        <Route element={<Protecteds  />}>
          <Route path="/registration" element={<Registration />} />
      
        </Route>

        {/* <Protecteds >
          <Route path="/registration" element={<Registration />} />
          </Protecteds> */}


      </Routes>
    </BrowserRouter>
  );
}

export default App;
