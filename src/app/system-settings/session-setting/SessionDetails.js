import axios from "axios";

const api_url = process.env.NEXT_PUBLIC_SYSTEM_SETTING_URL+"sessions";
const delete_session_api_url = process.env.NEXT_PUBLIC_SYSTEM_SETTING_URL+"sessions/";
const token = localStorage.getItem('authToken')

export const getSessionDetails = async () => {
  try {
    const res = await axios.get(api_url,{
      headers:{
        Authorization : `Bearer ${token}`
      }
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const updateSessionDetails = async (sessionData) => {
  try {
    const token = localStorage.getItem("authToken"); 
    if (!token) throw new Error("No auth token found");

    const res = await axios.post(
      api_url,
      sessionData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }
    );

    return res.data;
  } catch (err) {
    console.error("Session update failed:", {
      message: err.message,
      status: err.response?.status,
      data: err.response?.data
    });
    throw err;
  }
};

export const deleteSessionDetails = async (id) => {
  try{
    const res = axios.delete(delete_session_api_url+id,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    return res.data;
  }catch(err){
    return err
  }
}