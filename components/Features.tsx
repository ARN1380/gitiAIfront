"use client";

import Image from "next/image";
import galleryAdd from "@/public/assets/images/gallery-add.svg";
import videoAdd from "@/public/assets/images/video.svg";

import { useRef, useState } from "react";
import Avatars from "./tabFeatures/Retargeting/Avatars";
import { toast } from "react-toastify";
import ImageToVideo from "./tabFeatures/ImageToVideo";
import VideoToVideo from "./tabFeatures/VideoToVideo";
import StarLoader from "./StarLoader";
import ImageRetargeting from "./tabFeatures/Retargeting/ImageRetargeting";

export default function Features({ activeTab }: { activeTab: number }) {
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const videoInputRefSource = useRef<HTMLInputElement | null>(null);
  const videoInputRefDriving = useRef<HTMLInputElement | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | undefined>();
  const [videoPreviewSource, setVideoPreviewSource] = useState<
    string | undefined
  >();
  const [videoPreviewDriving, setVideoPreviewDriving] = useState<
    string | undefined
  >();
  const [uploadMessage, setUploadMessage] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [fetchedVideo, setFetchedVideo] = useState<string | null>(null);

  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [mood, setMood] = useState<string | undefined>();

  const handleVideoUrl = (url: string) => {
    setVideoUrl(url);
  };

  

  const notify = () => toast("فایل ها را به صورت صحیح بارگذاری کنید!");

  const retargetImageUpload = () => {
    if (!selectedImage) {
      notify();
      return null;
    }

    // switch (mood) {
    //   case 'smile':
    //     formData.append("smile", '0.03');
    //     console.log('appended');

    //     break;

    //   default:
    //     break;
    // }
    handleFileUpload(selectedImage, "image_retargeting", "smile");
  };

  const handleFileUpload = async (
    file: File,
    type: "image" | "video" | "image_retargeting" | "video_retargeting",
    mood?: string
  ) => {
    const formData = new FormData();

    // retargeting
    if (type === "image_retargeting") {
      formData.append("input_image", file);
      formData.append("smile", "2");
    } else if (type === "video_retargeting") {
      formData.append("input_video", file);
      formData.append("smile", "2");
    }

    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

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
    } catch (error) {
      console.error("Error uploading files:", error);
      console.log("this");
    }
  };

  const handleImageSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      console.log("no image is selected");

      setSelectedImage(null);
      setImagePreview(undefined);
      return;
    }

    const file = e.target.files[0];
    setSelectedImage(file);

    const objectUrl = URL.createObjectURL(file);
    setImagePreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  };

  const handleVideoSelection = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "source" | "driving"
  ) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedVideo(null);
      setVideoPreviewSource(undefined);
      setVideoPreviewDriving(undefined);
      return;
    }
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    const objectUrl = URL.createObjectURL(file);

    if (type == "source") {
      console.log("source");
      setSelectedVideo(file);
      setVideoPreviewSource(objectUrl);
    } else if (type == "driving") {
      setSelectedVideo(file);
      setVideoPreviewDriving(objectUrl);
    }

    return () => URL.revokeObjectURL(objectUrl);
  };

  const downloadVideo = () => {
    if (videoUrl) {
      const link = document.createElement("a");
      videoUrl.replace("blob:", "");
      link.href = videoUrl;
      console.log(videoUrl);
      link.download = "example-video.mp4"; // Default name for the downloaded file
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
            onVideoUrlChange={handleVideoUrl}
            setIsProcessing={setIsProcessing}
          />

          {videoUrl && (
            <>
              <div className="mt-8">
                <h6 className="font-extrabold text-xl">ویدئو تولید شده:</h6>
                <video
                  src={videoUrl}
                  controls
                  className="border border-gray-300 rounded-lg max-h-[300px]"
                />
              </div>
              <button
                className="bg-gradient-to-r from-[#3D16EC] to-[#FD247B] rounded-lg text-white w-[174px] h-[48px] mt-[20px] self-end"
                onClick={downloadVideo}
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
            onVideoUrlChange={handleVideoUrl}
            setIsProcessing={setIsProcessing}
          />

          {videoUrl && (
            <>
              <div className="mt-8">
                <h6 className="font-extrabold text-xl">ویدئو تولید شده:</h6>
                <video
                  src={videoUrl}
                  controls
                  className="border border-gray-300 rounded-lg max-h-[300px]"
                />
              </div>
              <button
                className="bg-gradient-to-r from-[#3D16EC] to-[#FD247B] rounded-lg text-white w-[174px] h-[48px] mt-[20px] self-end"
                onClick={downloadVideo}
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
            setImageUrl={setImageUrl}
            isProcessing={setIsProcessing}
          />
          {/* Display the AI generated Video */}
          {imageUrl && (
            <>
              <div className="mt-8">
                <h6 className="font-extrabold text-xl">ویدئو تولید شده:</h6>
                <img src={imageUrl} alt="somthing is wrong" />
              </div>
              <button
                className="bg-gradient-to-r from-[#3D16EC] to-[#FD247B] rounded-lg text-white w-[174px] h-[48px] mt-[20px] self-end"
                onClick={downloadVideo}
              >
                دانلود ویدئو
              </button>
            </>
          )}

          {isProcessing && <StarLoader />}
        </>
      );
    case 3:
      return (
        <>
          <div className="mt-[52px] flex gap-4">
            {/* Image Upload Section */}
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
                  onChange={(e) => {
                    handleVideoSelection(e, "source");
                  }}
                />

                {selectedVideo && videoPreviewSource ? (
                  <video
                    src={videoPreviewSource}
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

            {/* Emotion selection Section */}
            <div className="flex-1 flex flex-col gap-4">
              <h6>انتخاب کنید</h6>
              <div className="border-dashed border border-[#E5E7EB] rounded-lg min-h-[312px] flex items-center gap-2 justify-center">
                <Avatars setMood={setMood} />
              </div>
            </div>
          </div>

          {/* Display the AI generated Video */}
          {fetchedVideo ? (
            <>
              <div className="mt-8">
                <h6 className="font-extrabold text-xl">ویدئو تولید شده:</h6>
                <video
                  src={fetchedVideo}
                  controls
                  className="border border-gray-300 rounded-lg max-h-[300px]"
                />
              </div>
              <button
                className="bg-gradient-to-r from-[#3D16EC] to-[#FD247B] rounded-lg text-white w-[174px] h-[48px] mt-[20px] self-end"
                onClick={downloadVideo}
              >
                دانلود ویدئو
              </button>
            </>
          ) : (
            <button
              className="bg-gradient-to-r from-[#3D16EC] to-[#FD247B] rounded-lg text-white w-[174px] h-[48px] mt-[20px] self-end"
              onClick={()=>{}}
            >
              تولید ویدئو
            </button>
          )}

          {isProcessing && <StarLoader />}
        </>
      );
    default:
      return null;
  }
}
