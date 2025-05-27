import axios from "axios";

const api_url = process.env.NEXT_PUBLIC_SYSTEM_SETTING_URL+"front-cms-settings";
const token = localStorage.getItem("authToken");

export const getFrontCMSSettingDetails = async () => {
  try {
    const res = await axios.get(api_url,
      {
          headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    return res.data;
  } catch (error) {
    return error;
  }
};

export const postFrontCMS = async(data) => {
  console.log("Data to be sent:", data);
  try{
    const res = await axios.post(api_url,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }
    )
    return res
  }catch(err){
    return err
  }
}