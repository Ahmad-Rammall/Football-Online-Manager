import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Loader from "../Loader";
import "./index.css";

function MainLayout({ children }) {
  const [loading, setLoading] = useState(false);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {loading && <Loader />}
      <div
        style={{
          display: loading ? "none" : "",
          height:"100%"
        }}
      >
        <Header />
        <div className="childrenWrapper">
          {React.Children.map(children, (child) => {
            return React.cloneElement(child, {
              startLoading: () => setLoading(true),
              endLoading: () => setLoading(false),
            });
          })}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default MainLayout;
