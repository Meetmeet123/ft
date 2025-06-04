
import axios from "axios";

const api_url = process.env.NEXT_PUBLIC_SYSTEM_SETTING_URL+"captcha/settings";
const update_api_url = process.env.NEXT_PUBLIC_SYSTEM_SETTING_URL+"captcha/status";

export const getCaptchaDetails = async () => {
  try {
    const res = await axios.get(api_url,
      {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        }
      }
    );
    return res.data;
  } catch (error) {
    return error;
  }
};

export const updateCaptcha = async(item) => {
  try {
    console.log(item)
    const res = await axios.put(update_api_url, 
      item,
      {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        }
      }
    ); 
    return res;
  } catch (err) {
    console.error(err);
    return err;
  }
};
