import React from 'react'
import '../styles/auth.css'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginPartner } from '../api/authService';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const PartnerLogin = () => {
 const {partner}=useContext(AuthContext);
  const{setPartner}=useContext(AuthContext);
     useEffect(() => {
  console.log("Updated partner:", partner);
}, [partner])

   const navigate=useNavigate();
    const[formData,setFormData]=useState({
          
           email:" ",
           password:"",
         })

    const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
      const[loading,setLoading]=useState(false);
      const[error,setError]=useState("");
        
   
      const handleSubmit= async(e)=>
      {
        e.preventDefault();
        setError("");
      
      try{
        setLoading(true);
        const res= await loginPartner(formData);
         console.log( res.data);
         console.log(res.data.partner);   // partner object
         console.log(res.data.partner._id);
         setPartner(res.data.partner._id);
         console.log("login me partner",partner);
         
        console.log(res);
      
        navigate("/create/food")
        
      }
        catch(err)
        {
          console.log("login failed");
        }
      }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1 className="auth-title">Partner sign in</h1>
        <p className="auth-sub">Access your partner dashboard</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Business email</label>
          <input id="email" name="email" type="email" placeholder="contact@biz.com" onChange={handleChange} />

          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" placeholder="••••••••" onChange={handleChange} />

          <button type="submit" className="btn-primary">Sign in</button>
        </form>
      </section>
    </main>
  )
}

export default PartnerLogin
