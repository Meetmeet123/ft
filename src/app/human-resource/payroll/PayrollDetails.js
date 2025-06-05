import axios from "axios";

const payroll_api_url = process.env.NEXT_PUBLIC_HUMAN_RESOURCE_URL + "payroll";

// Helper to safely get the token from localStorage
const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken");
  }
  return null;
};

export const getPayrollDetails = async() => {
    try{
        const token = getToken();
        const res = await axios.get(payroll_api_url,
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return res;
    }catch(err){
        return err
    }
}