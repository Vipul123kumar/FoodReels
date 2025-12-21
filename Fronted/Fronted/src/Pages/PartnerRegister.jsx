import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/auth.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {registerPartner} from '../api/authService';

const PartnerRegister = () => {
      const navigate=useNavigate();
      const [formData,setFormData]=useState({
        business:"",
        email:"",
        phone:"",
        password:"",
        contactName:"",
        address:""
      })
       const[loading,setLoading]=useState(false);
          const[error,setError]=useState("");
      const handleChange=(e)=>
      {
        setFormData({
          ...formData,
          [e.target.name]:e.target.value,
        })
      }

      const handleSubmit= async(e)=>
      {
        e.preventDefault();
         
     
        // const res= await axios.post("http://localhost:3000/api/auth/food-partner/register",
        //     {   
        //        // fullName:fullName,
        //         name:business,
        //         email:email,
        //         password:password,
        //         phone:phone,
        //         address:address,
        //         contactName:contactName

        //     },{
        //         withCredentials:true
        //     }
        // )

        try{
          setLoading(true);
          const res=await registerPartner(formData);
           console.log( res.data);
        navigate("/food-partner/login")
        }
        catch (err)
        {
          setError(err.response?.data?.message || "something wrong");
        }

       
      }
  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1 className="auth-title">Partner sign up</h1>
        <p className="auth-sub">Register your food partner account</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="business">Business name</label>
          <input id="business" name="business" type="text" placeholder="Pizza Place" onChange={(e)=>{handleChange(e)}} />

          <label htmlFor="email">Business email</label>
          <input id="email" name="email" type="email" placeholder="contact@biz.com" onChange={(e)=>{handleChange(e)}} />

          <label htmlFor="phone">Phone</label>
          <input id="phone" name="phone" type="tel" placeholder="9222" onChange={(e)=>handleChange(e)} />

          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" placeholder="••••••••" onChange={handleChange}/>

           <label htmlFor="ContactName">Contact Name</label>
          <input id="contactName" name="contactName" type="text" placeholder="vipul" onChange={handleChange} />


          <label htmlFor="address">address</label>
          <input id="address" name="address" type="text" placeholder="••••••••" onChange={handleChange} />


          <button type="submit" className="btn-primary">Register</button>
        </form>
        <p className="auth-footer">Register as: <Link to="/api/auth/user/register">User </Link></p>
      </section>
    </main>
  )
}

export default PartnerRegister
