import Image from 'next/image';

export default function Home() {
  return (
    <main className="h-4 relative">
      <Image
        src="/Images/home.jpg"
        alt="Home background"
        fill
        className= "object-top"
        priority/>

    </main>
  );
} 