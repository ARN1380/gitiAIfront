import { useRef, useState } from "react";
import Image from "next/image";
import videoAdd from "@/public/assets/images/video.svg";
import { toast } from "react-toastify";

interface VideoToVideoProps {
  setVideoUrl: React.Dispatch<React.SetStateAction<string | null>>;
  setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>;
}

const VideoToVideo: React.FC<VideoToVideoProps> = ({
  setVideoUrl,
  setIsProcessing,
}) => {
  const [sourceVideo, setSourceVideo] = useState<File | null>(null);
  const [drivingVideo, setDrivingVideo] = useState<File | null>(null);

  const sourceVideoInputRef = useRef<HTMLInputElement>(null);
  const drivingVideoInputRef = useRef<HTMLInputElement>(null);

  const handleSourceVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setSourceVideo(e.target.files[0]);
    }
  };

  const handleDrivingVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setDrivingVideo(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!sourceVideo || !drivingVideo) {
      toast("لطفا ویدیو ها را به درستی انتخاب کنید");
      return;
    }

    setIsProcessing(true);
    const formData = new FormData();
    formData.append("source_video", sourceVideo);
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
      const videoBlobUrl = URL.createObjectURL(videoBlob);
      setVideoUrl(videoBlobUrl);
      setIsProcessing(false);
    } catch (error) {
      console.error("Error uploading files:", error);
      toast("مشکلی در اتصال به سرور پیش آمده");
      setIsProcessing(false);
    }
  };

  return (
    <>
      <div className="mt-[52px] flex gap-4">
        {/* source video Upload Section */}
        <div className="flex-1 flex flex-col gap-4">
          <h6>انتخاب ویدئوی مبدا</h6>
          <div
            className="border-dashed border border-[#E5E7EB] rounded-lg min-h-[312px] flex items-center gap-2 justify-center cursor-pointer"
            onClick={() => sourceVideoInputRef.current?.click()}
          >
            <input
              accept="video/*"
              type="file"
              className="hidden"
              ref={sourceVideoInputRef}
              onChange={handleSourceVideoChange}
            />

            {sourceVideo ? (
              <video
                src={URL.createObjectURL(sourceVideo)}
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

        {/* driving Video Upload Section */}
        <div className="flex-1 flex flex-col gap-4">
          <h6>انتخاب ویدئوی مقصد</h6>
          <div
            className="border-dashed border border-[#E5E7EB] rounded-lg min-h-[312px] flex items-center gap-2 justify-center cursor-pointer"
            onClick={() => drivingVideoInputRef.current?.click()}
          >
            <input
              accept="video/*"
              type="file"
              className="hidden"
              ref={drivingVideoInputRef}
              onChange={handleDrivingVideoChange}
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

export default VideoToVideo;
