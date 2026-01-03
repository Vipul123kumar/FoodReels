

import React, { useEffect, useRef, useState } from 'react'
import '../styles/reels.css'
import { Link } from "react-router-dom";
import axios from 'axios'
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import {reelsData} from '../api/authService';
import Food from './Food';
const Home = () => {
   const {isAuthenticated,setIsAuthenticated}=useContext(AuthContext)
   const {setPartner}=useContext(AuthContext);
   const {partner}=useContext(AuthContext);
  const containerRef = useRef(null)
  const [reels, setReels] = useState([])

 
  
console.log("parner store",partner);

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
  useEffect( () => {
    // axios
    //   .get("http://localhost:3000/api/food",{withCredentials:true})
    //   .then(response => {
    //     setReels(response.data.foodItems)
    //     console.log("page reload"); 
    //   })
    //   .catch((err) => console.log(err))
    // console.log("on first time");
    
    const fetchReels=async()=>
    {
    try {
       const res=await reelsData();
       console.log(res);
       setReels (res.data.foodItems);
    }
    catch(err)
    {
      console.log("error in fetching reels data");
    }
  }
  
    fetchReels();
  }, [])  
 
  return (
    
    <div> 
         {
            isAuthenticated ?(
              <div className="reels-container w-90 mt-2 rounded-[10px] mb-2 gap-2 ml-140 items-center" ref={containerRef}>
      {reels.map((item) => (
        <section className="reel-item " key={item._id}>
          
          <video
            className="reel-video "
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
           <Link className="reel-btn" to=
          //  {`/food-partner/${partner}`}
           {`/food-partner/${item.foodPartner._id}`}
           >
           Visit store
          </Link> 

          </div>
          
        </section>
      ))}
    </div>
            ):(
              <div className=''>
                < Food/>
                 {/* <h3 className='initial'>Hello Vipul</h3>

                 <div>
      <input type="file" accept="video/*"
      // onChange={handleVideoChange}
        />
      <button
      // onClick={handleUpload}
      type='button'
       >Upload Video</button>
    </div> */}

                 {/* <input
                  type='text'
                  placeholder='enter meal'

                 />
                 <input
                  type='text'
                  placeholder='description'
                 /> */}
              </div>
            )
         }

    </div>
    
  )
}

export default Home
