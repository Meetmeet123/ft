import axios from "axios";

const api_url = process.env.NEXT_PUBLIC_SYSTEM_SETTING_URL+"custom-fields/1";

export const getCustomDetails = async () => {
  try {
    const res = await axios.get(api_url);
    return res.data;
  } catch (error) {
    return error;
  }
};
