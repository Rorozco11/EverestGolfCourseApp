import Image from 'next/image';

export default function Home() {
  return (
    <main>
      {/* <div className="relative w-screen h-[75vh] z-0">
        <Image
          src="/Images/home.jpg"
          alt="Home background"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div> */}
      
      {/* #region Navbar */}
      <nav className="fixed top-0 w-full p-4 bg-black/80 backdrop-blur-sm z-10">
        <div className="flex justify-center items-center">
          <div className="flex gap-8">
            <a href="#" className="">Pacific Northwest</a>
            <a href="#" className="">Southwest</a>
            <a href="#" className="">Midwest</a>
          </div>
        </div>
      </nav>
      {/* #endregion */}
    </main>
  );
}