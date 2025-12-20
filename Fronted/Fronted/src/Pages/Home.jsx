

import React, { useEffect, useRef, useState } from 'react'
import '../styles/reels.css'
import { Link } from "react-router-dom";

import axios from 'axios'
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
   const {isAuthenticated,setIsAuthenticated}=useContext(AuthContext)
  const containerRef = useRef(null)
  const [reels, setReels] = useState([])

  

  // Auto-play logic
  useEffect(() => {
     if (!containerRef.current) return;
    const videos = containerRef.current?.querySelectorAll('video') || []

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target
          if (entry.intersectionRatio >= 0.75) {
            video.play().catch(() => {})
          } else {
            video.pause()
          }
        })
      },
      { threshold: 0.75 }
    )

    videos.forEach((v) => observer.observe(v))
    return () => observer.disconnect()
  }, [reels]) // <— when reels load, re-run observer

   const [count,setCount]=useState(0);
  // Fetch reels from API
  //for check 
  


  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, []);




  useEffect(() => {
    axios
      .get("http://localhost:3000/api/food",{withCredentials:true})
      .then(response => {
        setReels(response.data.foodItems)
        console.log("page reload");
        
      })
      .catch((err) => console.log(err))
   
    console.log("on first time");
    
  }, [])
 
  return (
    
    <div> 
         {
            isAuthenticated ?(
              <div className="reels-container" ref={containerRef}>
      {reels.map((item) => (
        <section className="reel-item" key={item._id}>
          
          <video
            className="reel-video"
            src={item.video}   // <— your API video URL
            muted
            playsInline
            loop
            preload="metadata"
            controls={false}
            onEnded={(e) => {
    const next =
      e.target.closest(".reel-item")?.nextElementSibling;
    next?.scrollIntoView({ behavior: "smooth" });
  }}
          />

           <div className="reel-overlay">
            <p className="reel-desc">{item.desc}</p>
           <Link className="reel-btn" to={`/food-partner/${item.foodPartner}`}>
           Visit store
          </Link>
             {/* <button
                  type='button'
                 onClick={()=>setCount(count+1)}
                 
                  >
                    increase count {count}
                  </button> */}
          </div>
          
        </section>
      ))}
    </div>
            ):(
              <div className='initial'>
                  <button
                  type='button'
                //  onClick={()=>setCount(count+1)}
                  >
                    increase count {count}
                  </button>
              </div>
            )
         }

    </div>
    
  )
}

export default Home
