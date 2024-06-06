// React dependencies
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components Folder
import AuthRequired from "../components/AuthRequired";
import HostLayout from "../components/HostLayout";
import Layout from "../components/Layout";

// Pages Folder
import About from "../pages/About";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";

// Host Folder
import Dashboard from "../pages/Host/Dashboard.jsx";
import HostVanDetail from "../pages/Host/HostVanDetail";
import HostVanInfo from "../pages/Host/HostVanInfo";
import HostVanPhotos from "../pages/Host/HostVanPhotos";
import HostVanPricing from "../pages/Host/HostVanPricing";
import HostVans from "../pages/Host/HostVans";
import Income from "../pages/Host/Income.jsx";
import Reviews from "../pages/Host/Reviews.jsx";
// Vans Folder
import VanDetail from "../pages/Vans/VanDetail.jsx";
import Vans from "../pages/Vans/Vans.jsx";

// Main Folder
import "../server.js";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*Layout route */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="vans" element={<Vans />} />
          <Route path="vans/:id" element={<VanDetail />} />
          <Route path="login" element={<Login />} />
          {/*Layout route */}
          <Route element={<AuthRequired />}>
            <Route path="host" element={<HostLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="income" element={<Income />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="vans" element={<HostVans />} />
              {/*Layout route */}
              <Route path="vans/:id" element={<HostVanDetail />}>
                <Route index element={<HostVanInfo />} />
                <Route path="pricing" element={<HostVanPricing />} />
                <Route path="photos" element={<HostVanPhotos />} />
              </Route>
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
