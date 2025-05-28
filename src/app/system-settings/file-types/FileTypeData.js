import axios from "axios";

const api_url = process.env.NEXT_PUBLIC_SYSTEM_SETTING_URL+"filetypes";

export const getFileTypeData = async() => {
    try{
        const res = await axios.get(api_url,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    "Content-Type": "application/json",
                    Accept: "application/json"
                }
            }
        )
        return res.data
    }catch(err){
        return err;
    }
}