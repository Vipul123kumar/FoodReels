import React from 'react'
import '../styles/auth.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../api/authService'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useState } from 'react'

const UserLogin = () => {
  const navigate= useNavigate();
  const {isAuthenticated,setIsAuthenticated}=useContext(AuthContext)
   const[formData,setFormData]=useState({
         
          email:" ",
          password:"",
        })
 const[loading,setLoading]=useState(false);
    const[error,setError]=useState("");
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

   
  const handleSubmit= async(e)=>
  {
    e.preventDefault();
    setError("");
   // const fullName=e.target.name.value;
    // const email=e.target.email.value;
    // const password=e.target.password.value;
 
  //  const res= await axios.post("http://localhost:3000/api/auth/user/login",
  //       {
  //          // fullName:fullName,
  //           email:email,
  //           password:password,


  //       },{
  //           withCredentials:true
  //       }
  //   )
  try{
    setLoading(true);
    const res=await loginUser(formData);
    console.log( res.data);
    setIsAuthenticated(true);
    navigate("/")
  }
    catch{
      setError(err.response?.data?.message ||"wrong username or password");
    }
    finally{
      setLoading(false);
    }
    
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-sub">Sign in to your account</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" placeholder="you@example.com"  onChange={handleChange} />

          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" placeholder="••••••••" onChange={handleChange} />

          <button type="submit" className="btn-primary">Sign in</button>
        </form>
      </section>
    </main>
  )
}

export default UserLogin
