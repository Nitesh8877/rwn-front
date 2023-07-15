import {AxiosInstance} from '../../utils/AxiosInstance'

export const getAllProducts=async()=>{
    const URL='/api/product'
    try {
        let result=AxiosInstance.get(URL,{
            headers:{
                'x-access-token':localStorage.getItem('token')
            }
        })
        console.log("result",result);
        return result 
    } catch (error) {
        console.log(error.message);
        throw error
    }
}

export const create=async(data)=>{
    const URL='/api/product'
    try {
        let result=AxiosInstance.post(URL,data,{
            headers:{
                'x-access-token':localStorage.getItem('token')
            }
        })
        console.log(result);
        return result;
    } catch (error) {
        console.log(error.message);
        throw error
    }
}

export const update=async(id,data)=>{
    const URL='/api/product/'+id;
    try {
        let result=AxiosInstance.put(URL,data,{
            headers:{
                'x-access-token':localStorage.getItem('token')
            }
        })
        console.log(result);
        return result;
        
    } catch (error) {
        console.log(error.message);
        throw error
    }
}

export const Delete=async(id)=>{
    const URL='/api/product/'+id;
    try {
        let result=AxiosInstance.delete(URL,{
            headers:{
                'x-access-token':localStorage.getItem('token')
            }
        });
        console.log(result);
        return result;
        
    } catch (error) {
        console.log(error.message)
        throw error
    }
}