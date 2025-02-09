import Image from "next/image";
import inProcessText from "@/public/assets/images/inProcessText.png";
import property1 from "@/public/assets/images/starLoader/Property 1.svg";
import property2 from "@/public/assets/images/starLoader/Property 2.svg";
import property3 from "@/public/assets/images/starLoader/Property 3.svg";
import property4 from "@/public/assets/images/starLoader/Property 4.svg";
import property5 from "@/public/assets/images/starLoader/Property 5.svg";
import property6 from "@/public/assets/images/starLoader/Property 6.svg";
import property7 from "@/public/assets/images/starLoader/Property 7.svg";

export default function StarLoader() {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40 flex items-center justify-center">
      <div className="fixed max-h-[446px] max-w-[331px] px-24 py-14 bg-white rounded-md flex flex-col items-center gap-[10px]">
        <div className="relative w-[200px] h-[200px]">
          <Image
            src={property1}
            alt="loader"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-myFade-1"
          />
          <Image
            src={property2}
            alt="loader"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-myFade-2 opacity-0"
          />
          <Image
            src={property3}
            alt="loader"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-myFade-3 opacity-0"
          />
          <Image
            src={property4}
            alt="loader"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-myFade-4 opacity-0"
          />
          <Image
            src={property5}
            alt="loader"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-myFade-5 opacity-0"
          />
          <Image
            src={property6}
            alt="loader"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-myFade-6 opacity-0"
          />
          <Image
            src={property7}
            alt="loader"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-myFade-7 opacity-0"
          />
        </div>
        <Image src={inProcessText} alt="loader" />
      </div>
    </div>
  );
}
