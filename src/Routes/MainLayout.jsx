// src/layout/MainLayout.jsx
import { Outlet } from "react-router-dom";
import Newheader from "../Components/WebSite_Componets/Newheader";

function MainLayout() {
  return (
    <>
      <Newheader />
      <Outlet />
    </>
  );
}

export default MainLayout;
