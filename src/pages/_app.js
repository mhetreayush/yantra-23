import "@/styles/globals.css";
import Image from "next/image";
import TopBlob from "@/../public/Assets/BlobTop.svg";
import BottomBlob from "@/../public/Assets/BlobBottom.svg";
export default function App({ Component, pageProps }) {
  return (
    <div className="relative min-h-screen">
      <Image
        src={TopBlob}
        className="absolute top-0 left-0 -z-10"
        alt="TopBlob"
      />
      <nav className="py-4 px-16 bg-[#D9D9D9]/60 backdrop-blur-sm sticky top-0 w-full">
        <h1>Home</h1>
      </nav>
      <Component {...pageProps} />
      <Image
        className="absolute bottom-0 right-0 -z-10"
        src={BottomBlob}
        alt="BottomBlob"
      />
    </div>
  );
}
