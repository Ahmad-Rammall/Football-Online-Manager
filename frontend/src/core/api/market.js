import { sendRequest } from "../request";

export const marketDataSource = {
  getMarketPlayers: async () => {
    const response = await sendRequest({
      route: "market",
    });
    return response;
  },
};
