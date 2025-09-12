import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "../pages/layout";
import Dashboard from "../pages/dashboard/dashboard.jsx";
import UserPage from "../pages/usuario/UserPage.jsx";

const AppRouter = () => {
  const userRole = "admin"; // simulado por ahora

  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta por defecto */}
        <Route path="/" element={<Navigate to="/admin/dashboard" />} />

        {/* Páginas del panel de administrador */}
        {userRole === "admin" && (
          <>
            <Route
              path="/admin/dashboard"
              element={
                <Layout>
                  <Dashboard />
                </Layout>
              }
            />
            <Route
              path="/admin/usuarios"
              element={
                <Layout>
                  <UserPage />
                </Layout>
              }
            />
          </>
        )}

        {/* Aquí podrías agregar otras rutas sin Layout, como login */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

