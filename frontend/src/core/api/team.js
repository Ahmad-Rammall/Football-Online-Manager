import { sendRequest } from "../request";

export const teamDataSource = {
  getMyTeam: async () => {
    const response = await sendRequest({
      route: "team",
    });
    return response;
  },
  updateTeamName: async (data) => {
    const response = await sendRequest({
      route: "team",
      method: "PUT",
      body: data,
    });
    return response;
  },
};
