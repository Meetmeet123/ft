
import axios from "axios";

const api_url = process.env.NEXT_PUBLIC_SYSTEM_SETTING_URL+"languages/rows";
const delete_api_url = process.env.NEXT_PUBLIC_SYSTEM_SETTING_URL+"languages/";
const add_api_url = process.env.NEXT_PUBLIC_SYSTEM_SETTING_URL+"languages";

const token = localStorage.getItem("authToken");

export const getLanguage = async() => {
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
}

export const deleteLanguages = async(id) => {
  try{
    const res = await axios.delete(delete_api_url+id,
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

export const addNewData = async(data) => {
  try{
    console.log(data)
    const res = await axios.post(add_api_url,
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