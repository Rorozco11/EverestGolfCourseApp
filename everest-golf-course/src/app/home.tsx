import Image from "next/image";

export default function Home() {
  return (
    <main className="h-[75vh] relative">
     
     <Image
        src="/Images/home.jpg"  
        alt="Home background"
        fill
        className="object-cover"
        priority
      />
     
      
    </main>
  );
}
