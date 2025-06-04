import axios from "axios";

const api_url = process.env.NEXT_PUBLIC_SYSTEM_SETTING_URL+"email-config";
const token = localStorage.getItem("authToken");

export const getEmailSettingData = async() => {
  try {
    const res = await axios.get(api_url,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }
    );
    return res;
  } catch (error) {
    return error;
  }
}