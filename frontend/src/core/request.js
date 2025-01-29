import axios from "axios";

const apiHost = import.meta.env.VITE_REACT_APP_API_HOST;

const api = axios.create({
  baseURL: apiHost,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const errorMessage = error.response.data;

      if (errorMessage === "Expired JWT" || errorMessage === "No Token") {
        localStorage.removeItem("token");
        window.location.href = "/auth";
      }
    }

    return Promise.reject(error);
  }
);

export const sendRequest = async ({ method = "GET", body, route }) => {
  const response = await api.request({
    url: `${apiHost}/${route}`,
    method,
    data: body,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });

  return response;
};
