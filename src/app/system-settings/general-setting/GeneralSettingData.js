import axios from "axios";

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken");
  }
  return null;
};

const getApiUrl = (path) => {
  const base = process.env.NEXT_PUBLIC_SYSTEM_SETTING_URL;
  if (!base) throw new Error("API base URL is not set in env.");
  return `${base}${path}`;
};

export const getGeneralSettingDetails = async () => {
  try {
    const api_url = getApiUrl("settings");
    const token = getToken();

    const res = await axios.get(api_url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Fetch general settings failed:", error);
    return error;
  }
};

export const updateSettingURL = async (settingDetails) => {
  try {
    const update_api_url = getApiUrl("settings/update-general");
    const token = getToken();

    const res = await axios.post(update_api_url, settingDetails, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return res;
  } catch (error) {
    console.error("Update failed:", error);
    return error;
  }
};

const uploadImage = async (path, formData, label) => {
  try {
    const api_url = getApiUrl(path);
    const token = getToken();

    const res = await axios.post(api_url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const updateLogo = (formData) => uploadImage("settings/update-logo", formData, "Print logo");
export const updateAdminLogo = (formData) => uploadImage("settings/update-admin-logo", formData, "Admin logo");
export const updateSmallLogo = (formData) => uploadImage("settings/update-admin-small-logo", formData, "Admin small logo");
export const updateAppLogo = (formData) => uploadImage("settings/update-app-logo", formData, "App logo");
export const updateClerkSignature = (formData) => uploadImage("settings/update-clerk-sign", formData, "Clerk signature");
export const updateExaminerSignature = (formData) => uploadImage("settings/update-examiner-sign", formData, "Examiner signature");
export const updatePrincipalSignature = (formData) => uploadImage("settings/update-principal-sign", formData, "Principal signature");
export const updateClassTeacherSignature = (formData) => uploadImage("settings/update-class-teacher-sign", formData, "Class teacher signature");
