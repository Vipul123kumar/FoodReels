// import React from 'react'
// import { useState } from 'react'

// const Food = () => {
//     const[name,setName]=useState("");
//     const [des,setDes]=useState("");
//   return (
//     <div className='border'>
//         <h3 className='text-white '>Upload food video here!</h3>
       
//         <h3>Enter Food Name Here!</h3>
//         <input
//         className='border text-white'
//          type='text'
//          value={name}
//          placeholder='Enter Food name'
//         onChange={(e) => setName(e.target.value)}

//         />
//         <input
//          type='text'
//          value={des}
//          onChange={()=>{(e)=>setDes(e.target.value)}}
//         />

//          <input
//          type='file'
         

//         />
//     </div>
//   )
// }

// export default Food


import React, { useState } from "react";
import axios from "axios";
import { uploadVideo } from "../api/authService";
const Food = () => {
  const [name, setName] = useState("");
  const [des, setDes] = useState("");
  const [video, setVideo] = useState(null);
  const [preview, setPreview] = useState("");

  // Handle video upload
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideo(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("foodName", name);
    formData.append("description", des);
    formData.append("video", video);

     try{
        const res=await uploadVideo(formData);
        console.log("video uploaded",res.data);
        navigate("/user/login")
        
     }
      catch(err)
        {
          console.log("login failed",err);
        }

    // Example axios request
   
    // axios.post("http://localhost:3000/api/food", formData)
    //   .then(res => console.log(res.data))
    //   .catch(err => console.log(err));
   

    // alert("Food uploaded successfully!");
  };

  return (
    <div className="max-w-lg mx-auto bg-gray-900 p-6 rounded-lg shadow-lg mt-10 border border-gray-700">
      <h2 className="text-2xl font-semibold text-white mb-4">
        Upload Food Video 🍽️
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Food Name */}
        <div>
          <label className="text-gray-300 block mb-1">Food Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter food name"
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-blue-500 outline-none"
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-gray-300 block mb-1">Description</label>
          <input
            type="text"
            value={des}
            onChange={(e) => setDes(e.target.value)}
            placeholder="Enter short description"
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-blue-500 outline-none"
          />
        </div>

        {/* Video Upload */}
        <div>
          <label className="text-gray-300 block mb-1 border border-2-white">Upload Video</label>
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoChange}
            className="w-full text-gray-300"
          />
        </div>

        {/* Video Preview */}
        {preview && (
          <video
            src={preview}
            controls
            className="w-full mt-4 rounded border border-gray-700"
          ></video>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg mt-3 font-medium"
        >
          Upload Food
        </button>
      </form>
    </div>
  );
};

export default Food;
