import { createContext, useState, useContext } from "react";

const TeamContext = createContext();

export const TeamProvider = ({ children }) => {
  const [teamId, setTeamId] = useState(null);

  const addTeamId = (teamId) => {
    setTeamId(teamId);
  };

  return (
    <TeamContext.Provider value={{ teamId, addTeamId }}>
      {children}
    </TeamContext.Provider>
  );
};

export const useTeam = () => {
  return useContext(TeamContext);
};
