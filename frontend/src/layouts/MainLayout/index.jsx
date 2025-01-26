import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Loader from "../Loader";

function MainLayout({ children }) {
  const [loading, setLoading] = useState(false);

  return (
    <div>
      {loading && <Loader />}
      <div
        style={{
          display: loading ? "none" : "",
        }}
      >
        <Header />
        <div>
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
