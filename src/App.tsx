import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout/MainLayout";
import { routes } from "./routes";

export const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                <Suspense fallback={
                  <div className="d-flex justify-content-center align-items-center p-6">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                }>
                  {route.element}
                </Suspense>
              }
            />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
