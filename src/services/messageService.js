import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/messages";

export const sendMessage = async (messageData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(`${API_URL}/send`, messageData, config);
  return response.data;
};