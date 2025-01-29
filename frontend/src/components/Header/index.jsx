import React, { useState } from "react";
import "./index.css";
import { useNavigate, useLocation } from "react-router-dom";

const NavigationOption = ({ onClick, isSelected, text }) => {
  return (
    <div onClick={onClick} className={isSelected ? "selected" : "option"}>
      {text}
    </div>
  );
};

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const [selected, setSelected] = useState({
    team: location.pathname === "/profile",
    market: location.pathname === "/market",
  });

  const handleSelectPage = (type) => {
    setSelected({
      team: type === "team",
      market: type === "market",
    });
  };

  return (
    <div className="wrapper">
      <div className="container">
        <NavigationOption
          onClick={() => {
            handleSelectPage("team");
            navigate("/profile");
          }}
          text={"Team"}
          isSelected={selected.team}
        />
        <p>
          <img src="/logo.png" width={70} />
        </p>
        <NavigationOption
          onClick={() => {
            handleSelectPage("market");
            navigate("/market");
          }}
          text={"Market"}
          isSelected={selected.market}
        />
      </div>
    </div>
  );
}

export default Header;
