import axios from "axios";

const api_url = process.env.NEXT_PUBLIC_HUMAN_RESOURCE_URL + "staff-attendance";
const token = localStorage.getItem("authToken");

export const getStaffAttendance = async () => {
  try {
    const res = await axios.get(`${api_url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return res;
  } catch (error) {
    return error;
  }
}