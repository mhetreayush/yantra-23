import ChatBot from "@/component/ChatBot";
import "@/styles/globals.css";
import Image from "next/image";

export default function App({ Component, pageProps }) {
  return (
    <div className="relative min-h-screen">
      <ChatBot />
      <Component {...pageProps} />
    </div>
  );
}
