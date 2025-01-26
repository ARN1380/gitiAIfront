"use client";

import Image from "next/image";
import galleryAdd from "@/public/assets/images/gallery-add.svg";
import videoAdd from "@/public/assets/images/video.svg";
import { useEffect, useRef, useState } from "react";

export default function Features({ activeTab }: { activeTab: number }) {
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const videoInputRef = useRef<HTMLInputElement | null>(null);

  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [uploadMessage, setUploadMessage] = useState<string>("");


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
        setUploadMessage(`${type === "image" ? "Image" : "Video"} uploaded successfully: ${data.filePath}`);
      } else {
        const errorData = await response.json();
        setUploadMessage(`Error: ${errorData.error}`);
      }
    } catch (error) {
      setUploadMessage(`An error occurred while uploading the ${type}.`);
      console.error(error);
    }
  };

  const fileSelectorHandler = async (e: React.ChangeEvent<HTMLInputElement>, type: "image" | "video") => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(null);
      setPreview(undefined);
      return;
    }

    const file = e.target.files[0];
    setSelectedFile(file);

    // Set preview for image or video
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    // Automatically upload the file
    await handleFileUpload(file, type);

    // Free memory when unmounted
    return () => URL.revokeObjectURL(objectUrl);
  };

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  // rendering
  switch (activeTab) {
    case 0:
      return (
        <div className="mt-[52px] flex gap-4">
          {/* Image Upload Section */}
          <div className="flex-1 flex flex-col gap-4">
            <h6>انتخاب تصویر</h6>
            <div
              className="border-dashed border border-[#E5E7EB] rounded-lg min-h-[312px] flex items-center gap-2 justify-center cursor-pointer"
              onClick={() => {
                imageInputRef.current?.click();
              }}
            >
              <input
                accept="image/*"
                type="file"
                className="hidden"
                ref={imageInputRef}
                onChange={(e) => fileSelectorHandler(e, "image")}
              />

              {selectedFile && preview ? (
                <img src={preview} alt="user image" />
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
              onClick={() => {
                videoInputRef.current?.click();
              }}
            >
              <input
                accept="video/*"
                type="file"
                className="hidden"
                ref={videoInputRef}
                onChange={(e) => fileSelectorHandler(e, "video")}
              />

              {selectedFile && preview ? (
                <video src={preview} controls className="max-h-[300px]" />
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
      );
      break;

    case 1:
      break;

    case 2:
      break;

    case 3:
      break;

    default:
      break;
  }
}
