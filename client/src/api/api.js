import axios from "axios";

const API_URL = "http://localhost:5000/api/notices"; // Backend API

// Fetch all notices
export const getNotices = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching notices:", error);
    return [];
  }
};

// Post a new notice
export const addNotice = async (noticeData) => {
  try {
    const response = await axios.post(API_URL, noticeData);
    return response.data;
  } catch (error) {
    console.error("Error adding notice:", error.response?.data || error.message);
    return null;
  }
};
