"useClient";

import galleryAdd from "@/public/assets/images/gallery-add.svg";

import Image from "next/image";
import { toast } from "react-toastify";
import { useRef, useState } from "react";
import Avatars from "./Avatars";

interface imageRetargetingProps {
  setImageUrl: React.Dispatch<React.SetStateAction<string | null>>;
  isProcessing: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ImageRetargeting({
  setImageUrl,
  isProcessing,
}: imageRetargetingProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreviewSrc, setImagePreviewSrc] = useState<string | undefined>(
    undefined
  );
  const [mood, setMood] = useState<string | undefined>(undefined);

  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      console.log("no image is selected");
      setSelectedImage(null);
      setImagePreviewSrc(undefined);
      toast("عکس را به درستی انتخاب کنید!")
      return;
    }
    console.log(e.target.files[0]);
    
    const file = e.target.files[0];
    setSelectedImage(file);

    const objectUrl = URL.createObjectURL(file);
    setImagePreviewSrc(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  };

  const moodSelector = () => {
    if (!selectedImage) {
      toast("عکس به صورت صحیح بارگزاری نشده!");
      return null;
    }
    fetchData(selectedImage, "smile");
  };

  const fetchData = async (file: File, mood?: string) => {
    const formData = new FormData();

    formData.append("input_image", file);
    formData.append("smile", "2");
    
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
  
    isProcessing(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/process_image_retargeting/",
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const imageBlob = await response.blob();
      const imageBlobUrl = URL.createObjectURL(imageBlob);
      setImageUrl(imageBlobUrl);
      isProcessing(false);
    } catch (error) {
      console.error("Error uploading files:", error);
      isProcessing(false);
    }
  };

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

            {selectedImage && imagePreviewSrc ? (
              <img src={imagePreviewSrc} alt="user image" />
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

        {/* Emotion selection Section */}
        <div className="flex-1 flex flex-col gap-4">
          <h6>انتخاب کنید</h6>
          <div className="border-dashed border border-[#E5E7EB] rounded-lg min-h-[312px] flex items-center justify-center">
            <Avatars setMood={setMood} />
          </div>
        </div>
      </div>

      <button
        className="bg-gradient-to-r from-[#3D16EC] to-[#FD247B] rounded-lg text-white w-[174px] h-[48px] mt-[20px] self-end"
        onClick={moodSelector}
      >
        تولید ویدئو
      </button>
    </>
  );
}
