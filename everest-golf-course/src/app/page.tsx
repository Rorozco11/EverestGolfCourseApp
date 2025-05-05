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

        <div className="relative w-screen h-[80vh] -z-10">
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

      </main>
      <FooterSection /> 
    </> 
  );
}