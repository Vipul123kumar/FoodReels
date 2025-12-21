import React from 'react'
import '../styles/auth.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginPartner } from '../api/authService';

const PartnerLogin = () => {
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
