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
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      {loading && <Loader />}
      <div
        style={{
          display: loading ? "none" : "flex",
          flexDirection: "column",
          flexGrow: 1,
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
