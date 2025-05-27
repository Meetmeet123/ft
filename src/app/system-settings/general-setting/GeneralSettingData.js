import axios from "axios";

const api_url = process.env.NEXT_PUBLIC_SYSTEM_SETTING_URL+"settings";
const token = localStorage.getItem('authToken')

export const getGeneralSettingDetails = async () => {
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

const update_api_url = process.env.NEXT_PUBLIC_SYSTEM_SETTING_URL + "settings/update-general";

export const updateSettingURL = async (settingDetails) => {
  try {
    console.log(settingDetails)
    const res = await axios.post(update_api_url,
      settingDetails,
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
    console.error("Update failed:", error);
    return error;
  }
};

export const updateLogo = async(formData) => {
  try {
    console.log('Sending print logo data:',await formData);
    const res = await axios.post(api_url + "/update-logo", 
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          // Don't set Content-Type for FormData - let axios handle it automatically
          Accept: "application/json"
        }
      }
    );
    return res.data;
  } catch (err) {
    console.error("Print logo update failed:", err);
    throw err; // Re-throw to handle in component
  }
}

export const updateAdminLogo = async(formData) => {
  try {
    console.log('Sending admin logo data:', formData);
    
    const res = await axios.post(
      process.env.NEXT_PUBLIC_SYSTEM_SETTING_URL + "settings/update-admin-logo",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          // Don't set Content-Type for FormData - let axios handle it automatically
          Accept: "application/json"
        }
      }
    );
    return res.data;
  } catch(err) {
    console.error("Admin logo update failed:", err);
    throw err; // Re-throw to handle in component
  }
}

export const updateSmallLogo = async(formData) => {
  try {
    console.log('Sending admin small logo data:', formData);
    
    const res = await axios.post(
      process.env.NEXT_PUBLIC_SYSTEM_SETTING_URL + "settings/update-admin-small-logo",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          // Don't set Content-Type for FormData - let axios handle it automatically
          Accept: "application/json"
        }
      }
    );
    return res.data;
  } catch(err) {
    console.error("Admin small logo update failed:", err);
    throw err; // Re-throw to handle in component
  }
}

export const updateAppLogo = async(formData) => {
  try {
    console.log('Sending app logo data:', formData);
    
    const res = await axios.post(
      process.env.NEXT_PUBLIC_SYSTEM_SETTING_URL + "settings/update-app-logo",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          // Don't set Content-Type for FormData - let axios handle it automatically
          Accept: "application/json"
        }
      }
    );
    return res.data;
  } catch(err) {
    console.error("App logo update failed:", err);
    throw err; // Re-throw to handle in component
  }
}

export const updateClerkSignature = async(formData) => {
  try {
    console.log('Sending app logo data:', formData);
    
    const res = await axios.post(
      process.env.NEXT_PUBLIC_SYSTEM_SETTING_URL + "settings/update-clerk-sign",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          // Don't set Content-Type for FormData - let axios handle it automatically
          Accept: "application/json"
        }
      }
    );
    return res.data;
  } catch(err) {
    console.error("App logo update failed:", err);
    throw err; // Re-throw to handle in component
  }
}

export const updateExaminerSignature = async(formData) => {
  try {
    console.log('Sending app logo data:', formData);
    
    const res = await axios.post(
      process.env.NEXT_PUBLIC_SYSTEM_SETTING_URL + "settings/update-examiner-sign",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          // Don't set Content-Type for FormData - let axios handle it automatically
          Accept: "application/json"
        }
      }
    );
    return res.data;
  } catch(err) {
    console.error("App logo update failed:", err);
    throw err; // Re-throw to handle in component
  }
}

export const updatePrincipalSignature = async(formData) => {
  try {
    console.log('Sending app logo data:', formData);
    
    const res = await axios.post(
      process.env.NEXT_PUBLIC_SYSTEM_SETTING_URL + "settings/update-principal-sign",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          // Don't set Content-Type for FormData - let axios handle it automatically
          Accept: "application/json"
        }
      }
    );
    return res.data;
  } catch(err) {
    console.error("App logo update failed:", err);
    throw err; // Re-throw to handle in component
  }
}

export const updateClassTeacherSignature = async(formData) => {
  try {
    console.log('Sending app logo data:', formData);
    
    const res = await axios.post(
      process.env.NEXT_PUBLIC_SYSTEM_SETTING_URL + "settings/update-app-logo",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          // Don't set Content-Type for FormData - let axios handle it automatically
          Accept: "application/json"
        }
      }
    );
    return res.data;
  } catch(err) {
    console.error("App logo update failed:", err);
    throw err; // Re-throw to handle in component
  }
}