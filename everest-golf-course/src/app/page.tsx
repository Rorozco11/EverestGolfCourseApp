import Image from 'next/image';

export default function Home() {
  return (
    <main>

      {/* #region Navbar */}
      <div className="fixed top-0 left-0 right-0 bg-white h-[7rem] z-10">
        <div className="container mx-auto px-4 h-full">
          <div className="absolute left-0 top-2">
            <div className="relative md:h-24 md:w-24">
              <Image
                src="/Images/dark.png"
                alt="Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <div className="h-full flex justify-center items-center">
            <div className="flex gap-14">
              <a href="page.tsx" className="text-black text-sm font-bold underline">HOME</a>
              <a href="" className="text-black font-semibold text-sm">RATES</a>
              <a href="" className="text-black font-semibold text-sm">MEMBERHSHIPS</a>
              <a href="" className="text-black font-semibold text-sm">CONTACT</a>
            </div>
          </div>
        </div>
      </div>
      {/* #endregion */}

      <div className="relative w-screen h-[80vh] -z-10">
        <Image
          src="/Images/BetterRes.jpg"
          alt="Home background"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* #region Hero Section */}
      <div className="absolute inset-0 flex flex-col items-center justify-center -mt-[80px]">
        <div className="relative h-64 w-64">
          <Image
            src="/Images/light.png"
            alt="Center Logo"
            fill
            className="object-contain"
          />
        </div>
        <button className="mt-12 bg-green-700 text-white px-8 py-3 rounded-xl hover:bg-green-800 transition-colors font-semibold text-base">
          BOOK A TEE TIME
        </button>
      </div>
      {/* #endregion */}

      {/* #region Footer Section */}
      <div className="w-full bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-3 items-center">
            {/* Left Column - Location & Hours */}
            <div className="text-left">
              <h3 className="font-bold mb-2">Location</h3>
              <p className="flex items-center gap-2">
                <span className="text-red-500">📍</span>
                300 Everest Road, Nepal 06044
              </p>
              <h3 className="font-bold mt-4 mb-2">Hours</h3>
              <p>Everyday 8AM-6PM</p>
            </div>

            {/* Center Column - Logo */}
            <div className="flex flex-col items-center">
              <div className="relative h-40 w-40">
                <Image
                  src="/Images/dark.png"
                  alt="Bottom Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-[.5rem] text-gray-600 copyright">©2025 EVEREST GOLF CLUB BY RYAN OROZCO</p>
            </div>

            {/* Right Column - Social & Contact */}
            <div className="text-right">
              <div className="flex flex-col items-end gap-2">
                <a href="#" className="flex items-center justify-end w-full gap-2">
                  <Image src="/Images/instagram.png" alt="Instagram" width={20} height={20} />
                 <p className="text-sm">everestgolfclub</p>
                </a>
                <a href="#" className="flex items-center justify-end w-full gap-2">
                  <Image src="/Images/facebook.png" alt="Facebook" width={20} height={20} />
                  <p className="text-sm">everestgolfclub</p>
                </a>
                <a href="tel:629-299-1555" className="flex items-center justify-end w-full gap-2">
                  <Image src="/Images/phone.png" alt="Phone" className="-rotate-90" width={22} height={22} />
                  <p className="text-sm">629-299-1555</p>
                </a>
                <a href="mailto:everestgolfclub@gmail.com" className="flex items-center justify-end w-full gap-2">
                  <Image src="/Images/email.png" alt="Email" width={20} height={20} />
                  <p className="text-sm">everestgolfclub@gmail.com</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* #endregion */}
    </main>
  );
}