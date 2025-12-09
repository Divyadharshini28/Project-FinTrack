import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import Signup from "./pages/signup";

import DashboardLayout from "./layout/dashboardlayout";
import Dashboard from "./pages/dashboard";
import Transactions from "./pages/transactions";
import Categories from "./pages/categories";
import Profile from "./pages/profile";
import Analytics from "./pages/analytics";
import Summary from "./pages/summary";

import Protected from "./components/protected";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* PROTECTED DASHBOARD ROUTES */}
        <Route
          path="/dashboard/*"
          element={
            <Protected>
              <DashboardLayout />
            </Protected>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="categories" element={<Categories />} />
          <Route path="profile" element={<Profile />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="summary" element={<Summary />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
