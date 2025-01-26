"use client";

import Image from "next/image";
import galleryAdd from "@/public/assets/images/gallery-add.svg";
import videoAdd from "@/public/assets/images/video.svg";
import inProcessText from "@/public/assets/images/inProcessText.png";
import starLoader from "@/public/assets/images/starLoader.png";

import { useEffect, useRef, useState } from "react";

export default function Features({ activeTab }: { activeTab: number }) {

  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const videoInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | undefined>();
  const [videoPreview, setVideoPreview] = useState<string | undefined>();
  const [uploadMessage, setUploadMessage] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);


  const handleFileUpload = async (file: File, type: "image" | "video") => {

    const formData = new FormData();
    formData.append(type, file);

    const endpoint = type === "image" ? "upload-image" : "upload-video";

    try {
      const response = await fetch(`http://localhost:4000/${endpoint}`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setUploadMessage(
          `${type === "image" ? "Image" : "Video"} uploaded successfully: ${
            data.filePath
          }`
        );
      } else {
        const errorData = await response.json();
        setUploadMessage(`Error: ${errorData.error}`);
      }
    } catch (error) {
      setUploadMessage(`An error occurred while uploading the ${type}.`);
      console.error(error);
    }
  };

  const handleImageSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedImage(null);
      setImagePreview(undefined);
      return;
    }

    const file = e.target.files[0];
    setSelectedImage(file);

    // Create preview
    const objectUrl = URL.createObjectURL(file);
    setImagePreview(objectUrl);

    // Free memory when unmounted
    return () => URL.revokeObjectURL(objectUrl);
  };

  const handleVideoSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedVideo(null);
      setVideoPreview(undefined);
      return;
    }

    const file = e.target.files[0];
    setSelectedVideo(file);

    // Create preview
    const objectUrl = URL.createObjectURL(file);
    setVideoPreview(objectUrl);

    // Free memory when unmounted
    return () => URL.revokeObjectURL(objectUrl);
  };

  const handleImageUpload = async () => {
    if (selectedImage) {
      await handleFileUpload(selectedImage, "image");
    } else {
      setUploadMessage("No image selected for upload.");
    }
  };

  const handleVideoUpload = async () => {
    if (selectedVideo) {
      await handleFileUpload(selectedVideo, "video");
    } else {
      setUploadMessage("No video selected for upload.");
    }
  };

  const aiProcess = async () => {
    setIsProcessing(true);
    await handleVideoUpload();
    await handleImageUpload();
    
    try {
      const response = await fetch("http://localhost:4000/example-image", {
        method: "GET",      
      });
      
      if(response.ok){
        console.log("AI Process started");
        const data = await response.json();
        await console.log(data);
        
      }
    } catch (error) {
      
    }

  };

  switch (activeTab) {
    case 0:
      return (
        <>
          <div className="mt-[52px] flex gap-4">
            {/* Image Upload Section */}
            <div className="flex-1 flex flex-col gap-4">
              <h6>انتخاب تصویر</h6>
              <div
                className="border-dashed border border-[#E5E7EB] rounded-lg min-h-[312px] flex items-center gap-2 justify-center cursor-pointer"
                onClick={() => imageInputRef.current?.click()}
              >
                <input
                  accept="image/*"
                  type="file"
                  className="hidden"
                  ref={imageInputRef}
                  onChange={handleImageSelection}
                />

                {selectedImage && imagePreview ? (
                  <img src={imagePreview} alt="user image" />
                ) : (
                  <>
                    <Image src={galleryAdd} alt="logo" width={24} height={24} />
                    <p className="text-[#767676]">بارگذاری تصویر</p>
                  </>
                )}
              </div>
              <div className="flex gap-2">
                <p>حداکثر حجم تصویر:</p>
                <p>20 مگابایت</p>
              </div>
            </div>

            {/* Video Upload Section */}
            <div className="flex-1 flex flex-col gap-4">
              <h6>انتخاب ویدئو</h6>
              <div
                className="border-dashed border border-[#E5E7EB] rounded-lg min-h-[312px] flex items-center gap-2 justify-center cursor-pointer"
                onClick={() => videoInputRef.current?.click()}
              >
                <input
                  accept="video/*"
                  type="file"
                  className="hidden"
                  ref={videoInputRef}
                  onChange={handleVideoSelection}
                />

                {selectedVideo && videoPreview ? (
                  <video
                    src={videoPreview}
                    controls
                    className="max-h-[300px]"
                  />
                ) : (
                  <>
                    <Image src={videoAdd} alt="logo" width={24} height={24} />
                    <p className="text-[#767676]">بارگذاری ویدیو</p>
                  </>
                )}
              </div>

              <div className="flex gap-2">
                <p>حداکثر حجم ویدیو:</p>
                <p>200 مگابایت</p>
              </div>
            </div>
          </div>
          <button
            className="bg-gradient-to-r from-[#3D16EC] to-[#FD247B] rounded-lg text-white w-[174px] h-[48px] mt-[20px] self-end"
            onClick={aiProcess}
          >
            تولید ویدئو
          </button>

          {isProcessing && <>
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40">

            <div className="max-h-[446px] max-w-[331px] px-24 py-14 bg-white rounded-md flex flex-col items-center gap-[10px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
              <Image src={starLoader} alt="loader" />
              <Image src={inProcessText} alt="loader" />
            </div>
          </div>
          </>}
        </>
      );

    default:
      return null;
  }
}
