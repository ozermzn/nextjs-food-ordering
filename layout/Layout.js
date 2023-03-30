import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import React from "react";
const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <div className="flex flex-col justify-between h-screen">
        <Header />
        {children}
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Layout;
