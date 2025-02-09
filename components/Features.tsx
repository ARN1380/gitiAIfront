"use client";

import Image from "next/image";
import galleryAdd from "@/public/assets/images/gallery-add.svg";
import videoAdd from "@/public/assets/images/video.svg";

import { useRef, useState } from "react";
import Avatars from "./Avatars";
import { toast } from "react-toastify";
import ImageToVideo from "./tabFeatures/ImageToVideo";
import VideoToVideo from "./tabFeatures/VideoToVideo";
import StarLoader from "./StarLoader";

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

  const handleVideoUrl = (url: string) => {
    setVideoUrl(url);
  };

  const notify = () => toast("فایل ها را به صورت صحیح بارگذاری کنید!");

  const handleFileUpload = async (file: File, type: "image" | "video") => {
    const formData = new FormData();
    // formData.append(type, file);
    if (type === "video") {
      formData.append("driving_video", file);
    } else if (type === "image") {
      formData.append("source_image", file);
    }

    const endpoint = type === "image" ? "upload-image" : "upload-video";

    try {
      const response = await fetch("http://localhost:8000/api/process_video", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
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
    if (!selectedImage || !selectedVideo) {
      notify();
      return null;
    }
    setIsProcessing(true);
    await handleVideoUpload();
    await handleImageUpload();

    try {
      // Fetch the example video
      const response = await fetch("http://localhost:4000/example-video/", {
        method: "GET",
      });

      if (response.ok) {
        const videoBlob = await response.blob();
        const videoUrl = URL.createObjectURL(videoBlob);
        setFetchedVideo(videoUrl);
      } else {
        console.error("Failed to fetch the example video");
      }
    } catch (error) {
      console.error(
        "An error occurred while fetching the example video:",
        error
      );
    } finally {
      setIsProcessing(false);
    }
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

            {/* Emotion selection Section */}
            <div className="flex-1 flex flex-col gap-4">
              <h6>انتخاب کنید</h6>
              <div className="border-dashed border border-[#E5E7EB] rounded-lg min-h-[312px] flex items-center justify-center">
                <Avatars />
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
              onClick={aiProcess}
            >
              تولید ویدئو
            </button>
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
                <Avatars />
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
              onClick={aiProcess}
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
