import {AxiosInstance} from '../../utils/AxiosInstance'
export const SignUp=async(data)=>{
console.log(data)

     const URL="/signup"
    try {
        let result=await AxiosInstance.post(URL,data)
        console.log(result);
        return result;
    } catch (error) {
        console.log(error)
        throw error
    }
        
}

export const SignIn=async(data)=>{
    const URL="/signin"

    try {
        let result=await AxiosInstance.post(URL,data)
        console.log("result",result)
        const {email, username, token} =result.data
        localStorage.setItem('username',username);
        localStorage.setItem('token',token);
        localStorage.setItem('email',email);
        return result;
    } catch (error) {
        console.log(error)
        throw error
        
    }
}

export const logout=async()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    localStorage.removeItem('username')
    
}