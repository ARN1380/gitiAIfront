"use client";

import { useState } from "react";

import ImageToVideo from "./tabFeatures/ImageToVideo";
import VideoToVideo from "./tabFeatures/VideoToVideo";
import StarLoader from "./StarLoader";
import ImageRetargeting from "./tabFeatures/Retargeting/ImageRetargeting";
import VideoRetargeting from "./tabFeatures/Retargeting/VideoRetargeting";

export default function Features({ activeTab }: { activeTab: number }) {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const [I2VvideoUrl, setI2VvideoUrl] = useState<string | null>(null);
  const [V2VvideoUrl, setV2VvideoUrl] = useState<string | null>(null);
  const [retartgetingImageUrl, setRetargetingImageUrl] = useState<string | null>(null);
  const [retargetingVideoUrl, setRetargetingVideoUrl] = useState<string | null>(null);

  const downloadVideo = (data: string, type: 'image' | 'video') => {
    if (data) {
      const link = document.createElement("a");
      data.replace("blob:", "");
      link.href = data;
      console.log(data);
      if (type === 'video') {        
        link.download = "example-video.mp4"; // Default name for the downloaded file
      } else if (type === 'image') {        
        link.download = "example-video.png"; // Default name for the downloaded file
      }
      document.body.appendChild(link);
      console.log(link);

      link.click();
      document.body.removeChild(link);
    }
  };

  switch (activeTab) {
    case 0:
      return (
        <>
          <ImageToVideo
            setVideoUrl={setI2VvideoUrl}
            setIsProcessing={setIsProcessing}
          />

          {I2VvideoUrl && (
            <>
              <div className="mt-8">
                <h6 className="font-extrabold text-xl">ویدئو تولید شده:</h6>
                <video
                  src={I2VvideoUrl}
                  controls
                  className="border border-gray-300 rounded-lg max-h-[300px]"
                />
              </div>
              <button
                className="bg-gradient-to-r from-[#3D16EC] to-[#FD247B] rounded-lg text-white w-[174px] h-[48px] mt-[20px] self-end"
                onClick={()=>{downloadVideo(I2VvideoUrl)}}
              >
                دانلود ویدئو
              </button>
            </>
          )}

          {isProcessing && <StarLoader />}
        </>
      );
    case 1:
      return (
        <>
          <VideoToVideo
            setVideoUrl={setV2VvideoUrl}
            setIsProcessing={setIsProcessing}
          />

          {V2VvideoUrl && (
            <>
              <div className="mt-8">
                <h6 className="font-extrabold text-xl">ویدئو تولید شده:</h6>
                <video
                  src={V2VvideoUrl}
                  controls
                  className="border border-gray-300 rounded-lg max-h-[300px]"
                />
              </div>
              <button
                className="bg-gradient-to-r from-[#3D16EC] to-[#FD247B] rounded-lg text-white w-[174px] h-[48px] mt-[20px] self-end"
                onClick={()=>{downloadVideo(V2VvideoUrl)}}
              >
                دانلود ویدئو
              </button>
            </>
          )}

          {isProcessing && <StarLoader />}
        </>
      );
    case 2:
      return (
        <>
          <ImageRetargeting
            setImageUrl={setRetargetingImageUrl}
            isProcessing={setIsProcessing}
          />
          {/* Display the AI generated image */}
          {retartgetingImageUrl && (
            <>
              <div className="mt-8">
                <h6 className="font-extrabold text-xl">ویدئو تولید شده:</h6>
                <img src={retartgetingImageUrl} alt="ai generated image" />
              </div>
              <button
                className="bg-gradient-to-r from-[#3D16EC] to-[#FD247B] rounded-lg text-white w-[174px] h-[48px] mt-[20px] self-end"
                onClick={()=>{downloadVideo(retartgetingImageUrl)}}
              >
                دانلود تصویر
              </button>
            </>
          )}

          {isProcessing && <StarLoader />}
        </>
      );
    case 3:
      return (
        <>
          <VideoRetargeting
            setVideoUrl={setRetargetingVideoUrl}
            isProcessing={setIsProcessing}
          />

          {/* Display the AI generated Video */}
          {retargetingVideoUrl && (
            <>
              <div className="mt-8">
                <h6 className="font-extrabold text-xl">ویدئو تولید شده:</h6>
                <video
                  src={retargetingVideoUrl}
                  controls
                  className="border border-gray-300 rounded-lg max-h-[300px]"
                />
              </div>
              <button
                className="bg-gradient-to-r from-[#3D16EC] to-[#FD247B] rounded-lg text-white w-[174px] h-[48px] mt-[20px] self-end"
                onClick={()=>{downloadVideo(retargetingVideoUrl)}}
              >
                دانلود ویدئو
              </button>
            </>
          )}

          {isProcessing && <StarLoader />}
        </>
      );
    default:
      return null;
  }
}
