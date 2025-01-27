import { sendRequest } from "../request";

export const marketDataSource = {
  getMarketPlayers: async () => {
    const response = await sendRequest({
      route: "market",
    });
    return response;
  },
  buyPlayer: async (data) => {
    const response = await sendRequest({
      route: "market/buy-player",
      method: "POST",
      body:data
    });
    return response;
  },
};
