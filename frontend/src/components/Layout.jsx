import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Layout(  ) {
  return (
    <div>
      <aside><Sidebar/></aside>
      <main><Outlet/></main>
    </div>
  );
}
