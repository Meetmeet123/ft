import axios from 'axios'

const api_url = process.env.NEXT_PUBLIC_SYSTEM_SETTING_URL+"roles";
const token = localStorage.getItem("authToken");

export const getRolePermission = async () => {
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
    return res.data;
  } catch (error) {
    return error;
  }
};

export const updateRolePermission = async (data, id) => {
  console.log(data)
  try {
    const res = await axios.put(api_url+"/"+id, data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }
    );
    return res.data;
  } catch (error) {
    return error;
  }
}


export const deleteRolePermission = async (id) => {
  try {
    const res = await axios.delete(api_url+"/"+id,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }
    );
    return res.data;
  } catch (error) {
    return error;
  }
}