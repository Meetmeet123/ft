import axios from "axios";

const api_url = process.env.NEXT_PUBLIC_SYSTEM_SETTING_URL+"settings";

export const getGeneralSettingDetails = async () => {
  try {
    const res = await axios.get(api_url);
    return res.data;
  } catch (error) {
    return error;
  }
};

const update_api_url = process.env.NEXT_PUBLIC_SYSTEM_SETTING_URL + "settings/update-general";

export const updateSettingURL = async (settingDetails) => {
  try {
    const res = await axios.post(update_api_url, settingDetails );
    return res.data;
  } catch (error) {
    console.error("Update failed:", error.response.data);
    return error;
  }
};
