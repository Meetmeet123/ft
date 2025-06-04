import axios from "axios";

const book_list_api = process.env.NEXT_PUBLIC_API_URL + "/books";
const token = localStorage.getItem("authToken")

export const getLibraryBookList = async () => {
    try{
        const res = await axios.get(book_list_api+"/all",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return res;
    }catch(err){
        return err
    }
}

export const AddBook = async (data) => {
    if (!data) throw new Error("Data is required");

    try{
        const res = await axios.post(book_list_api,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return res;
    }catch(err){
        return err
    }
}


export const updateBookDetails = async (id, data) => {
    if (!id || !data) throw new Error("ID and Data is required");
    try{
        const res = await axios.put(book_list_api+"/"+id,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return res;
    }catch(err){
        return err
    }
}

export const deleteDetails = async (id) => {
    if (!id) throw new Error("ID is required");
    try{
        const res = await axios.delete(book_list_api+"/"+id,
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

export const uploadCsvFile = async(data) => {
    try{
        const res = await axios.post(book_list_api+"/import", 
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return res;
    }catch(err){
        throw err;
    }
}

export const uploadNewCsvFile = async (data) => {
    try{
        const res = await axios.post(book_list_api+"/import-new",
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return res;
    }catch(err){
        throw err;
    }
}