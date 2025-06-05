import axios from "axios";

const leave_request_api = process.env.NEXT_PUBLIC_HUMAN_RESOURCE_URL + "leave-requests";

// Helper to safely get the token from localStorage
const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken");
  }
  return null;
};

export const getLeaveRequestData = async () => {
  try {
    const token = getToken();
    const res = await axios.get(leave_request_api, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return res;
  } catch (err) {
    return err;
  }
};

export const AddNewLeaveRequest = async (data) => {
  try {
    const token = getToken();
    const res = await axios.post(leave_request_api, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (err) {
    return err;
  }
};

export const deleteLeaveRequest = async (data) => {
  try {
    const token = getToken();
    const res = await axios.delete(`${leave_request_api}/${data.lid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data,
    });
    return res;
  } catch (err) {
    return err;
  }
};

export const updateStatus = async (data) => {
  try {
    const token = getToken();
    const res = await axios.post(`${leave_request_api}/status`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (err) {
    return err;
  }
};

export const getRecordById = async (id) => {
  try {
    const token = getToken();
    const res = await axios.post(`${leave_request_api}/record`, { id }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (err) {
    return err;
  }
};

export const getLeaveCount = async (data) => {
  try {
    const token = getToken();
    const res = await axios.post(`${leave_request_api}/count`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (err) {
    return err;
  }
};
