import axios from "axios";

const api_url = process.env.NEXT_PUBLIC_SYSTEM_SETTING_URL+"sms-config";
const token = localStorage.getItem("authToken")

export const getSmsDetails = async () => {
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
    console.log("SMS Details:", res.data);
    return res;
  } catch (error) {
    return error;
  }
};

export const uploadData = async (data) => {
  try{
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