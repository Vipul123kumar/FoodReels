import axiosInstance from "./axiosInstance";
 export const registerUser=(payload)=>
{
    return axiosInstance.post("/api/auth/user/register",payload);
};

export const loginUser=(payload)=>
{
    return axiosInstance.post("/api/auth/user/login",payload)
}

export const registerPartner=(payload)=>
{
    return axiosInstance.post("/api/auth/food-partner/register",payload);
}

export const loginPartner=(payload)=>
{
    return axiosInstance.post("/api/auth/food-partner/login",payload)
}

export const reelsData=()=>
{
    return axiosInstance.get("/api/food",{withCredentials:true});
}
