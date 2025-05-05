import Image from 'next/image';
import MobileNavbar from "./components/MobileNavbar";
import NavbarHome from "./components/NavbarHome";
import FooterSection from "./components/Footer"
import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* Desktop Navbar: visible on md and up */}
      <div className="hidden md:block">
        <NavbarHome />
      </div>
      {/* Mobile Navbar: visible below md */}
      <div className="block md:hidden">
        <MobileNavbar />
      </div>
      <main>

        <div className="relative w-screen h-[100vh] md:h-[80vh] -z-10">
          <Image
            src="/Images/BetterRes.jpg"
            alt="Home background"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center -mt-[80px]">
          <div className="relative h-64 w-64">
            <Image
              src="/Images/light.png"
              alt="Center Logo"
              fill
              className="object-contain"
            />
          </div>
          <Link href="/booking">
          <button className="mt-12 bg-green-700 text-white px-8 py-3 rounded-xl hover:bg-green-800 transition-colors font-semibold text-base">
            BOOK A TEE TIME
          </button>
          </Link>
        </div>

        <div className="flex md:hidden fixed bottom-16 left-1/2 -translate-x-1/2 w-full justify-center z-50 px-4">
          <div className="w-full max-w-xs bg-black bg-opacity-60 rounded-xl py-3 px-4 flex justify-between items-start text-white text-xs">
            <div className="flex flex-col items-start">
              <span className="font-bold mb-1">Location</span>
              <span className="flex items-center">
                300 Everest Road, Nepal 06044
              </span>
            </div>
            <div className="flex flex-col items-start ml-6">
              <span className="font-bold mb-1">Hours</span>
              <span>8AM–6PM</span>
            </div>
          </div>
        </div>

        {/* Social Icons Row for Mobile */}
        <div className="flex md:hidden fixed bottom-32 left-1/2 -translate-x-1/2 w-full justify-center z-50">
          <div className="flex flex-row gap-6 bg-black bg-opacity-60 rounded-xl py-2 px-4">
            <img src="/Images/instagram.png" alt="Instagram" className="w-6 h-6 filter invert" />
            <img src="/Images/facebook.png" alt="Facebook" className="w-6 h-6 filter invert" />
            <img src="/Images/phone.png" alt="Phone" className="w-6 h-6 -rotate-90 filter invert" />
            <img src="/Images/email.png" alt="Email" className="w-6 h-6 filter invert" />
          </div>
        </div>

        <div className="flex md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 w-full justify-center z-50 pointer-events-none">
          <p className="text-[.5rem] text-white text-center pointer-events-auto">
            ©2025 EVEREST GOLF CLUB BY RYAN OROZCO
          </p>
        </div>

      </main>
      <div className="hidden md:block">
      <FooterSection /> 
      </div>
      
    </> 
  );
}