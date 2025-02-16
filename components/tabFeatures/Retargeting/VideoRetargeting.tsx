"useClient";

import videoAdd from "@/public/assets/images/video.svg";

import Image from "next/image";
import { toast } from "react-toastify";
import { useRef, useState } from "react";
import Avatars from "./Avatars";

interface videoRetargetingProps {
  setVideoUrl: React.Dispatch<React.SetStateAction<string | null>>;
  isProcessing: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function VideoRetargeting({
  setVideoUrl,
  isProcessing,
}: videoRetargetingProps) {
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [videoPreviewSrc, setVideoPreviewSrc] = useState<string | undefined>(
    undefined
  );
  const [mood, setMood] = useState<string | undefined>(undefined);

  const videoInputRef = useRef<HTMLInputElement>(null);

  const handleVideoSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      console.log("no image is selected");
      setSelectedVideo(null);
      setVideoPreviewSrc(undefined);
      toast("عکس را به درستی انتخاب کنید!");
      return;
    }

    const file = e.target.files[0];
    setSelectedVideo(file);

    const objectUrl = URL.createObjectURL(file);
    setVideoPreviewSrc(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  };

  const moodSelector = () => {
    if (!selectedVideo) {
      toast("عکس به صورت صحیح بارگزاری نشده!");
      return null;
    }
    switch (mood) {
      case "sad":        
        fetchData(selectedVideo, "expression2", "4");
        break;
      case "happy":        
        fetchData(selectedVideo, "expression1", "0.8");
        break;
      case "suprise":        
        fetchData(selectedVideo, "expression6", "3");
        break;
      case "wink":
        fetchData(selectedVideo, "wink", "20");
        break;
      case "angry":        
        fetchData(selectedVideo, "expression4", "3");
        break;
      case "smile":        
        fetchData(selectedVideo, "smile", "1.2");
        break;
      case "disgust":        
        fetchData(selectedVideo, "expression5", "3");
        break;
      case "scared":        
        fetchData(selectedVideo, "expression3", "2");
        break;

      default:
        break;
    }
  };

  const fetchData = async (file: File, mood: string, strength: string) => {
    const formData = new FormData();

    formData.append("input_video", file);
    formData.append(mood, strength);

    isProcessing(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/process_video_retargeting/",
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

      const videoBlob = await response.blob();
      const videoBlobUrl = URL.createObjectURL(videoBlob);
      setVideoUrl(videoBlobUrl);
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

            {selectedVideo && videoPreviewSrc ? (
              <video src={videoPreviewSrc} controls className="max-h-[300px]" />
            ) : (
              <>
                <Image src={videoAdd} alt="logo" width={24} height={24} />
                <p className="text-[#767676]">بارگذاری ویدیو</p>
              </>
            )}
          </div>
          <div className="flex gap-2">
            <p>حداکثر حجم ویدئو:</p>
            <p>200 مگابایت</p>
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

// <div className="mt-[52px] flex gap-4">
//             {/* Image Upload Section */}
//             <div className="flex-1 flex flex-col gap-4">
//               <h6>انتخاب ویدئو</h6>
//               <div
//                 className="border-dashed border border-[#E5E7EB] rounded-lg min-h-[312px] flex items-center gap-2 justify-center cursor-pointer"
//                 onClick={() => videoInputRefSource.current?.click()}
//               >
//                 <input
//                   accept="video/*"
//                   type="file"
//                   className="hidden"
//                   ref={videoInputRefSource}
//                   onChange={(e) => {
//                     handleVideoSelection(e, "source");
//                   }}
//                 />

//                 {selectedVideo && videoPreviewSource ? (
//                   <video
//                     src={videoPreviewSource}
//                     controls
//                     className="max-h-[300px]"
//                   />
//                 ) : (
//                   <>
//                     <Image src={videoAdd} alt="logo" width={24} height={24} />
//                     <p className="text-[#767676]">بارگذاری ویدیو</p>
//                   </>
//                 )}
//               </div>

//               <div className="flex gap-2">
//                 <p>حداکثر حجم ویدیو:</p>
//                 <p>200 مگابایت</p>
//               </div>
//             </div>

//             {/* Emotion selection Section */}
//             <div className="flex-1 flex flex-col gap-4">
//               <h6>انتخاب کنید</h6>
//               <div className="border-dashed border border-[#E5E7EB] rounded-lg min-h-[312px] flex items-center gap-2 justify-center">
//                 <Avatars setMood={setMood} />
//               </div>
//             </div>
//           </div>
