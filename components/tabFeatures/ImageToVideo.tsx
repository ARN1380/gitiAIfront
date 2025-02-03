import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import galleryAdd from "@/public/assets/images/gallery-add.svg";
import videoAdd from "@/public/assets/images/video.svg";

interface ImageToVideoProps {
  onVideoUrlChange: (url: string) => void;  
  setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>;

}

const ImageToVideo: React.FC<ImageToVideoProps> = ({
  onVideoUrlChange,
  setIsProcessing
}) => {
  const [sourceImage, setSourceImage] = useState<File | null>(null);
  const [drivingVideo, setDrivingVideo] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRefSource = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (videoUrl) {
      onVideoUrlChange(videoUrl);
      setIsProcessing(false);
    }
  }, [videoUrl, onVideoUrlChange]);

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
      alert("Please select both an image and a video.");
      return;
    }
    
    setIsProcessing(true);
    const formData = new FormData();
    formData.append("source_image", sourceImage);
    formData.append("driving_video", drivingVideo);

    try {
      const response = await fetch("http://localhost:8000/api/process_video", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const videoBlob = await response.blob();
      const videoUrl = URL.createObjectURL(videoBlob);
      setVideoUrl(videoUrl);
    } catch (error) {
      console.error("Error uploading files:", error);
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
              onChange={handleImageChange}
            />

            {sourceImage ? (
              <img src={URL.createObjectURL(sourceImage)} alt="user image" />
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
            onClick={() => videoInputRefSource.current?.click()}
          >
            <input
              accept="video/*"
              type="file"
              className="hidden"
              ref={videoInputRefSource}
              onChange={handleVideoChange}
            />

            {drivingVideo ? (
              <video
                src={URL.createObjectURL(drivingVideo)}
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
        onClick={handleSubmit}
      >
        تولید ویدئو
      </button>
    </>
  );
};

export default ImageToVideo;
