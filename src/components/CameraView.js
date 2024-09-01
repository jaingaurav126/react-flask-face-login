// src/components/CameraView.js
import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';

function CameraView() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [message, setMessage] = useState("Checking if you're a registered user...");

  useEffect(() => {
    // Start the camera when the component loads
    startCamera();

    // Capture the image and send it to the backend after a delay
    const timeoutId = setTimeout(() => {
      captureImage();
    }, 2000); // 2 seconds delay to capture the image

    return () => clearTimeout(timeoutId);
  }, []);

  const startCamera = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        videoRef.current.srcObject = stream;
      })
      .catch(err => console.error("Error accessing camera: ", err));
  };

  const captureImage = () => {
    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    const dataURL = canvasRef.current.toDataURL('image/png');

    // Send the image to the backend for comparison
    axios.post('http://localhost:9000/compare-image', { image: dataURL })
      .then(response => {
        if (response.data.success) {
          setMessage("You are a registered member. We are redirecting you to your profile, hold on...");
          // Redirect to the profile page after a short delay
          setTimeout(() => {
            window.location.href = `/profile?name=${encodeURIComponent(response.data.name)}&email=${encodeURIComponent(response.data.email)}&phone_number=${encodeURIComponent(response.data.phone_number)}&designation=${encodeURIComponent(response.data.designation)}&photo=${encodeURIComponent(response.data.photo)}`;
          }, 3000); // 3 seconds delay
        } else {
          setMessage("Please register your profile.");
        }
      })
      .catch(error => {
        console.error("There was an error!", error);
        setMessage("An error occurred while checking your profile.");
      });
  };

  return (
    <div>
      <video ref={videoRef} autoPlay muted style={{ width: '320px', height: '240px' }} />
      <canvas ref={canvasRef} style={{ display: 'none' }} width="320" height="240"></canvas>
      <p>{message}</p>
    </div>
  );
}

export default CameraView;
