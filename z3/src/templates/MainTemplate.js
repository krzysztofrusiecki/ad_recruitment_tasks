import React from "react";

import Sidebar from "../components/Sidebar";

const MainTemplate = ({ children }) => {
  return (
    <>
      <Sidebar />
      <div
        style={{
          minHeight: "100vh",
          marginLeft: "300px",
        }}
      >
        {children}
      </div>
    </>
  );
};

export default MainTemplate;
