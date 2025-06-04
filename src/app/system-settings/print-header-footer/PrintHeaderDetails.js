import axios from "axios";

const api_url = process.env.NEXT_PUBLIC_SYSTEM_SETTING_URL + "print-header-footer";
const token = localStorage.getItem("authToken");

export const getHeaderFooterDetails = async () => {
  try {
    const res = await axios.get(api_url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    });
    return res.data;
  } catch (error) {
    console.error('Error fetching header footer details:', error);
    throw error;
  }
};

export const postData = async(formData) => {
  try {
    console.log('Sending admin logo data:', formData);
    const res = await axios.post(
      api_url,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    return res.data;
  } catch(err) {
    throw err; // Re-throw to handle in component
  }
}
