import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./home";
import CustomerListPage from "./customers";
import Createcustomer from "./customers/create-customer";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/customers">
          <Route path="" element={<CustomerListPage />} />
          <Route path="create" element={<Createcustomer />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
