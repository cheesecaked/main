import * as React from "react";
import { Home } from "./jsxFiles/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PostPage } from "./jsxFiles/PostPage";
export const App =() => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/Post/:id' element={<PostPage />} />
      </Routes>
    </BrowserRouter>
  );
}

