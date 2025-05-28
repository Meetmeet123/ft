
import axios from "axios";

const api_url = process.env.NEXT_PUBLIC_SYSTEM_SETTING_URL+"modules";
const token = localStorage.getItem("authToken");

export const getModuleData = async() => {
  try{
    const res = axios.get(api_url,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }
    );
    return res;
  }catch(err){
    return err
  }
}