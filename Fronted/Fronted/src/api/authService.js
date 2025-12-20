import axiosInstance from "./axiosInstance";
 export const registerUser=(payload)=>
{
    return axiosInstance.post("/api/auth/user/register",payload);
};

export const loginUser=(payload)=>
{
    return axiosInstance.post("/api/auth/user/login",payload)
}


