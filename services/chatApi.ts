import axios from "axios";

const API_URL = "https://billpayment-api-v2.azurewebsites.net/api/v1/chat";

export async function sendChatMessage(message: string) {
  const res = await axios.post(API_URL, {
    message,
  });

  return res.data;
}
