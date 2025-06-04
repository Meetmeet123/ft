import axios from "axios";

const api_url = process.env.NEXT_PUBLIC_SYSTEM_SETTING_URL+"sms-config";

// Helper to safely get the token from localStorage
const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken");
  }
  return null;
};

export const getSmsDetails = async () => {
  try {
    const token = getToken();
    const res = await axios.get(api_url,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }
    );
    console.log("SMS Details:", res.data);
    return res;
  } catch (error) {
    return error;
  }
};

export const uploadData = async (data) => {
  try{
    const token = getToken();
    console.log(data)
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
    return res;
  }catch(err){
    return err
  }
}