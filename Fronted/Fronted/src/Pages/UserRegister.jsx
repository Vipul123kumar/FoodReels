import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/auth.css'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../api/authService'

const UserRegister = () => {
    const navigate=useNavigate();
    // using in proper 
      const[formData,setFormData]=useState({
        fullName:"",
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
    try{
      setLoading(true);
      const res=await registerUser(formData);
      console.log(res.data);
      navigate("/");
      
    }
    catch (err)
    {
      setError(err.response?.data?.message || "something wrong");

    } finally{
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1 className="auth-title">Create account</h1>
        <p className="auth-sub">Register as a user</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Full name</label>
          <input id="name"  name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            placeholder="Jane Doe" />

          <label htmlFor="email">Email</label>
          <input
           id="email" 
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required 
           
           placeholder="you@example.com" />

          <label htmlFor="password">Password</label>
          <input id="password" 
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          placeholder="••••••••" />

           {error && <p className="error-text">{error}</p>}

              <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>
        <p className="auth-footer">Register as:- <Link to="/food-partner/register">Food Partner</Link></p>
      </section>
    </main>
  )
}

export default UserRegister
