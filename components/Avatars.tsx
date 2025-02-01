import Avatar1 from "@/public/assets/images/avatars/avatarImage1.png";
import Avatar2 from "@/public/assets/images/avatars/avatarImage2.png";
import Avatar3 from "@/public/assets/images/avatars/avatarImage3.png";
import Avatar4 from "@/public/assets/images/avatars/avatarImage4.png";
import Avatar5 from "@/public/assets/images/avatars/avatarImage5.png";
import Avatar6 from "@/public/assets/images/avatars/avatarImage6.png";
import Avatar7 from "@/public/assets/images/avatars/avatarImage7.png";
import Avatar8 from "@/public/assets/images/avatars/avatarImage8.png";
import tick from "@/public/assets/images/tick.svg";
import Image from "next/image";
import { useState } from "react";

export default function Avatars() {
  const [selected, setSelected] = useState<string>();

  const avatarList = [
    { image: Avatar1, mood: "sad" },
    { image: Avatar2, mood: "happy" },
    { image: Avatar3, mood: "suprise" },
    { image: Avatar4, mood: "stress" },
    { image: Avatar5, mood: "angry" },
    { image: Avatar6, mood: "smile" },
    { image: Avatar7, mood: "cry" },
    { image: Avatar8, mood: "scared" },
  ];

  return (
    <>
      <div className="flex flex-wrap gap-[10px] justify-center">
        {avatarList.map((avatar, index) => {
          return (
            <div key={index} className="relative group overflow-hidden">
              <Image
                src={avatar.image}
                alt={avatar.mood}
                className="transition-all duration-300 hover:brightness-50"
                onClick={() => setSelected(avatar.mood)}
              />
              <div className="absolute right-1/2 translate-x-1/2 w-full scale-105 rounded-b-2xl text-center bg-[#FFE69D] py-1 transition-all duration-300 translate-y-1 group-hover:-translate-y-7">
                {avatar.mood}
              </div>
              {selected == avatar.mood ? (
                <>
                <div className="absolute right-1/2 translate-x-1/2 w-full scale-105 rounded-b-2xl text-center bg-[#FFE69D] py-1 transition-all duration-100 -translate-y-7">
                  {avatar.mood}
                </div>
                <div className="absolute top-2 left-2 bg-white border border-[#c5c5c5] rounded-lg h-8 w-8 flex justify-center items-center">
                  <Image src={tick} alt="tick icon" />
                </div>
                </>
              ) : (
                ``
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
