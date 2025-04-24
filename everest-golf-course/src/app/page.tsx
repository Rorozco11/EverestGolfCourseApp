import Image from 'next/image';

export default function Home() {
  return (
    <main>
      <div className="relative w-screen h-[82vh] -z-10">
        <Image
          src="/Images/BetterRes.jpg"
          alt="Home background"
          fill
          quality={100}
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* #region Navbar */}
      <div className="fixed top-0 left-0 right-0 bg-white/80 h-[7.5rem]">
        <div className="container mx-auto px-4 h-full ">
          <div className="absolute left-0 top-2 ">
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
              <a href="page.tsx" className="text-black text-sm   font-bold underline">HOME</a>
              <a href="" className="text-black font-semibold text-sm">RATES</a>
              <a href="" className="text-black font-semibold text-sm">MEMBERSHIPS</a>
              <a href="" className="text-black font-semibold text-sm">CONTACT</a>
            </div>
          </div>
        </div>
      </div>
      {/* #endregion */}

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
      
      {/* #endregion */}

    </main>

  );
}