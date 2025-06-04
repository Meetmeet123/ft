import axios from "axios";

const designation_api_url = process.env.NEXT_PUBLIC_HUMAN_RESOURCE_URL + "designations"
const token = localStorage.getItem("authToken");

export const getDesignationDetails = async() => {
    try{
        const res = axios.get(designation_api_url,
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        )
        return res
    }catch(err){
        return err;
    }
}

export const AddNewDesignation = async(data) => {
    try{
        const res = axios.post(designation_api_url,
            data,
            {
                headers:{
                    Authorization:`Bearer ${token}`,
                }
            }
        )
        return res
    }catch(err){
        return err;
    }
}

export const deleteDesignation = async(id) => {
    try{
        const res = axios.delete(designation_api_url+"/"+id,
            {
                headers:{
                    Authorization:`Bearer ${token}`,
                }
            }
        )
        return res;
    }catch(err){
        return err;
    }
}