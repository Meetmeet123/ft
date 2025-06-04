import axios from "axios";

const api_url = process.env.NEXT_PUBLIC_HUMAN_RESOURCE_URL + "payroll";
const department_api_url = process.env.NEXT_PUBLIC_HUMAN_RESOURCE_URL + "departments";
const token = localStorage.getItem("authToken");

export const getPayrollDetails = async () => {
    try{
        const res = await axios.get(api_url, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        });
        return res.data;
    }catch(err){
        return err;
    }
}


export const getDeprtmentDetails = async () => {
    try {
        const res = await axios.get(department_api_url, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        });
        return res.data;
    } catch (error) {
        return error;
    }
}

export const updateDepartment = async (data) => {
    console.log(data)
    try {
        const res = await axios.post(department_api_url, 
            data, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        });
        return res;
    } catch (error) {
        return error;
    }
}

export const deleteDepartment = async (id) => {
    try{
        const res = axios.delete(department_api_url+"/"+id,
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