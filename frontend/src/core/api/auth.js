import { sendRequest } from "../request";

export const authDataSource = {
  authenticateUser: async (data) => {
    const response = await sendRequest({
      route: "auth",
      method: "POST",
      body: data,
    });
    return response;
  },
};
