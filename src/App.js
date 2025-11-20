import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useThemeStore } from "./store/themestore";

import Login from "./pages/login";
import DashboardLayout from "./layout/dashboardlayout";
import Dashboard from "./pages/dashboard";
import Transactions from "./pages/transactions";
import Categories from "./pages/categories";
import Profile from "./pages/profile";
import Signup from "./pages/signup";
import Protected from "./components/protected";

function App() {
  const theme = useThemeStore((state) => state.theme);

  return (
    <div className={theme === "light" ? "light-theme" : "dark-theme"}>
      <BrowserRouter>
        <Routes>
          {/* Login */}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Dashboard */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="categories" element={<Categories />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
