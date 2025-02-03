'use client';

import { useState } from 'react';

const ApiTest: React.FC = () => {
  const [sourceImage, setSourceImage] = useState<File | null>(null);
  const [drivingVideo, setDrivingVideo] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSourceImage(e.target.files[0]);
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDrivingVideo(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!sourceImage || !drivingVideo) {
      alert('Please select both an image and a video.');
      return;
    }

    const formData = new FormData();
    formData.append('source_image', sourceImage);
    formData.append('driving_video', drivingVideo);

    // Add other form fields if necessary
    // formData.append('flag_relative_input', 'true');
    // formData.append('scale_crop_driving_video', '2.2');
    // formData.append('vx_ratio_crop_driving_video', '0.0');
    // formData.append('vy_ratio_crop_driving_video', '-0.1');
    // formData.append('normalize_lip', 'false');
    // formData.append('do_crop', 'true');
    // formData.append('remap', 'true');
    // formData.append('stitching', 'true');
    // formData.append('animation_region', 'all');
    // formData.append('driving_option', 'expression-friendly');
    // formData.append('driving_multiplier', '1.0');
    // formData.append('crop_driving_video', 'false');
    // formData.append('scale', '2.3');
    // formData.append('vx_ratio', '0.0');
    // formData.append('vy_ratio', '-0.125');
    // formData.append('smooth_observation_variance', '3e-7');
    // console.log(formData);
    
    try {
      const response = await fetch('http://localhost:8000/api/process_video', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const videoBlob = await response.blob();
      const videoUrl = URL.createObjectURL(videoBlob);
      setVideoUrl(videoUrl);
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  return (
    <div>
      <h1>API Test</h1>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <input type="file" accept="video/*" onChange={handleVideoChange} />
      <button onClick={handleSubmit}>Submit</button>
      {videoUrl && (
        <div>
          <h2>Processed Video</h2>
          <video src={videoUrl} controls />
        </div>
      )}
    </div>
  );
};

export default ApiTest;