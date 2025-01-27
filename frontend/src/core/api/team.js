import { sendRequest } from "../request";

export const teamDataSource = {
  getMyTeam: async () => {
    const response = await sendRequest({
      route: "team",
    });
    return response;
  },
};
