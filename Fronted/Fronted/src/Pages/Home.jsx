// import React, { useEffect, useRef } from 'react'
// import '../styles/reels.css'
// import axios from 'axios'
// import { Navigate } from 'react-router-dom'
// const sampleReels = [
//   {
//     id: 1,
//     src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
//     desc: 'Delicious street food from the best local vendors — try their spicy paneer wrap today!'
//   },
//   {
//     id: 2,
//     src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm',
//     desc: 'Freshly baked goods delivered fast. Crispy on the outside, soft on the inside.'
//   },
//   {
//     id: 3,
//     src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
//     desc: 'Organic salads and bowls — healthy, colorful, and packed with flavor.'
//   }
// ]


// const Home = () => {
  
// const [reels, setReels] = useState([]);

//   const containerRef = useRef(null)

//   useEffect(() => {
//     const videos = containerRef.current?.querySelectorAll('video') || []

//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           const video = entry.target
//           if (entry.intersectionRatio >= 0.75) {
//             // play when mostly in view
//             video.play().catch(() => {})
//           } else {
//             video.pause()
//           }
//         })
//       },
//       { threshold: [0.25, 0.5, 0.75, 1] }
//     )

//     videos.forEach((v) => observer.observe(v))

//     return () => observer.disconnect()
//   }, [])

//   useEffect(()=>{
//     axios.get("http://localhost:3000/api/food")
//     .then((response)=>{
//      setReels(response.data.foodItems);
//       // setVideo(response.data.foodItems.video)
//     })

//   },[])

//   return (
//     <div className="reels-container" ref={containerRef}>
//       {sampleReels.map((r) => (
//         <section className="reel-item" key={r.id}>
//           <video
//             className="reel-video"
//             src={r.src}
//             muted
//             playsInline
//             loop
//             preload="metadata"
//             controls={false}
//           />

//           <div className="reel-overlay">
//             <p className="reel-desc">{r.desc}</p>
//             <a className="reel-btn" href="#">Visit store</a>
//           </div>
//         </section>
//       ))}
//     </div>
//   )
// }

// export default Home

import React, { useEffect, useRef, useState } from 'react'
import '../styles/reels.css'
import { Link } from "react-router-dom";

import axios from 'axios'

const Home = () => {
  const containerRef = useRef(null)
  const [reels, setReels] = useState([])

  // Auto-play logic
  useEffect(() => {
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
      { threshold: [0.25, 0.5, 0.75, 1] }
    )

    videos.forEach((v) => observer.observe(v))
    return () => observer.disconnect()
  }, [reels]) // <— when reels load, re-run observer

  // Fetch reels from API
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/food",{withCredentials:true})
      .then(response => {
        setReels(response.data.foodItems)
      })
      .catch((err) => console.log(err))
  }, [])
 
  return (
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
          />

          <div className="reel-overlay">
            <p className="reel-desc">{item.desc}</p>
           <Link className="reel-btn" to={`/food-partner/${item.foodPartner}`}>
           Visit store
          </Link>
          </div>
        </section>
      ))}
    </div>
  )
}

export default Home
