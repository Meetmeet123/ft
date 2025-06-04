import axios from "axios";

const leave_type_api_url = process.env.NEXT_PUBLIC_HUMAN_RESOURCE_URL + "leave-types"
const token = localStorage.getItem("authToken");

export const getLeaveTypeDetails = async () => {
    try{
        const res = axios.get(leave_type_api_url,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return res;
    }catch(err){
        return err;
    }
}

export const updateLeaveType = async (data) => {
    try{
        const res = axios.post(leave_type_api_url,
            data,
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

export const deleteLeaveType = async (id) => {
    try{
        const res = axios.delete(leave_type_api_url+"/"+id,
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return res
    }catch(err){
        return err;
    }
}