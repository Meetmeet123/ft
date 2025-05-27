import axios from "axios";

const api_url = process.env.NEXT_PUBLIC_SYSTEM_SETTING_URL+"payment-settings";
const token = localStorage.getItem("authToken");

export const getPaymentDetails = async () => {
  try {
    const res = await axios.get(api_url,
     {
        headers: {
        Authorization: `Bearer ${token}`,
      }
    } 
    );
    return res;
  } catch (error) {
    return error;
  }
};


export const AddPaymentDetails = async (data) => {  
  try {
    const res = await axios.post(api_url, data,
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

export const updatePaymentDetails = async (data) => {
  try{
    const res = await axios.put(api_url+"/active", data,
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
    return err;
  }
}

export const updatePaymentMethod = async (data) => {
  try{
    const res = await axios.put(api_url+"/active/true", data,
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
    return err;
  }
}