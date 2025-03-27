import axios from "axios";

const API_URL = "http://localhost:5000/api/timetables";

// ✅ Fetch all timetables
export const getTimetables = async () => {
  try {
    return await axios.get(API_URL);
  } catch (error) {
    console.error("Error fetching timetables:", error);
    throw error;
  }
};
