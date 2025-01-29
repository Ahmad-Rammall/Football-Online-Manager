import { createContext, useState, useContext } from "react";

const TeamContext = createContext();

export const TeamProvider = ({ children }) => {
  const [team, setTeam] = useState([]);

  return (
    <TeamContext.Provider value={{ team }}>{children}</TeamContext.Provider>
  );
};

export const useTeam = () => {
  return useContext(TeamContext);
};
