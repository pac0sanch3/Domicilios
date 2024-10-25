import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// páginas
import { Inicio } from "../pages/Inicio";
import {  Home } from "../pages/auth/Home";

export const AppRouter = () => {
  return (
    <>
      <Suspense>
        <Routes>
          <Route path="*" element={<Inicio />} />
          <Route path="/" element={<Inicio />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Suspense>
    </>
  );
};
