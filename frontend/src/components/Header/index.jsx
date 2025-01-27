import React, { useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";

const NavigationOption = ({ onClick, isSelected, text }) => {
  return (
    <div onClick={onClick} className={isSelected ? "selected" : "option"}>
      {text}
    </div>
  );
};

function Header() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState({
    team: false,
    market: false,
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
            handleSelectPage("market")
            navigate("/")
          }}
          text={"Market"}
          isSelected={selected.market}
        />
        <p>
          <img src="/logo.png" width={70} />
        </p>
        <NavigationOption
          onClick={() => {
            handleSelectPage("team")
            navigate("/profile")
          }}
          text={"Team"}
          isSelected={selected.team}
        />
      </div>
    </div>
  );
}

export default Header;
