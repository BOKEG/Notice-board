import axios from "axios";

const API_URL = "http://localhost:5000/api/notices";

export const getNotices = async () => {
  return await axios.get(API_URL);
};
