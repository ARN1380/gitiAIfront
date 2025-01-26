"use client";

import Image from "next/image";
import galleryAdd from "@/public/assets/images/gallery-add.svg";
import videoAdd from "@/public/assets/images/video.svg";
import { useEffect, useRef, useState } from "react";

export default function Features({ activeTab }: { activeTab: number }) {
  const uploadInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [uploadMessage, setUploadMessage] = useState<string>("");

  const fileSelectorHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(null);
      return;
    }

    const file = e.target.files[0];
    setSelectedFile(file);

    // Automatically upload the file
    const formData = new FormData();
    formData.append("image", file);

    try {      
      const response = await fetch("http://localhost:4000/upload-image/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setUploadMessage(`Image uploaded successfully: ${data.filePath}`);
      } else {
        const errorData = await response.json();
        setUploadMessage(`Error: ${errorData.error}`);
      }
    } catch (error) {
      setUploadMessage("در فرایند بارگذاری عکس مشکلی رخ داده");
      console.error(error)
    }
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
        <>
          {/* upload section */}
          <div className="mt-[52px] flex gap-4">
            {/* image */}
            <div className="flex-1 flex flex-col gap-4">
              <h6>انتخاب تصویر</h6>
              <div
                className="border-dashed border border-[#E5E7EB] rounded-lg min-h-[312px] flex items-center gap-2 justify-center cursor-pointer"
                onClick={() => {
                  uploadInputRef.current?.click();
                }}
              >
                <input
                  accept="image/*"
                  type="file"
                  className="hidden"
                  ref={uploadInputRef}
                  onChange={(e) => fileSelectorHandler(e)}
                />

                {selectedFile && <img src={preview} alt="user image" /> ? (
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
            {/* video */}
            <div className="flex-1 flex flex-col gap-4">
              <h6>انتخاب ویدئو</h6>
              <div className="border-dashed border border-[#E5E7EB] rounded-lg min-h-[312px] flex items-center gap-2 justify-center">
                <Image src={videoAdd} alt="logo" width={24} height={24} />
                <p className="text-[#767676]">بارگذاری ویدیو</p>
              </div>
              <div className="flex gap-2">
                <p>حداکثر حجم تصویر:</p>
                <p>200 مگابایت</p>
              </div>
            </div>
          </div>
        </>
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
