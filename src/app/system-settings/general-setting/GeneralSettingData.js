import axios from "axios";

const api_url = process.env.NEXT_PUBLIC_SYSTEM_SETTING_URL+"settings";

export const getGeneralSettingDetails = async () => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const res = await axios.get(api_url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });
    return res.data;
  } catch (error) {
    console.error('Error fetching settings:', error);
    throw error;
  }
};

const update_api_url = process.env.NEXT_PUBLIC_SYSTEM_SETTING_URL + "settings/update-general";

export const updateSettingURL = async (settingDetails) => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const res = await axios.post(update_api_url, settingDetails, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    return res.data;
  } catch (error) {
    console.error("Update failed:", error.response?.data || error.message);
    throw error;
  }
};
