import Image from 'next/image';
import Navbar from "../components/NavbarHome"
import FooterSection from "../components/Footer"

export default function Rates() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center py-12 px-4 pt-navbar">
      

          {/* WEEKDAYS */}
        <h1 className="text-3xl font-bold mb-8">WEEKDAYS</h1>
        <div className="flex flex-row justify-center gap-24 mb-12">
          {/* 9 Holes */}
          <div>
            <h2 className="text-2xl font-bold mb-2">9 Holes</h2>
            <ul className="text-lg">
              <li>Adults: $23</li>
            </ul>
          </div>
          {/* 18 Holes */}
          <div>
            <h2 className="text-2xl font-bold mb-2">18 Holes</h2>
            <ul className="text-lg">
              <li>Adults: $36</li>
            </ul>
          </div>
        </div>
         {/* WEEKENDS */}
         <h1 className="text-3xl font-bold mb-8">WEEKENDS</h1>
        <div className="flex flex-row justify-center gap-24 mb-12">
          {/* 9 Holes */}
          <div>
            <h2 className="text-2xl font-bold mb-2">9 Holes</h2>
            <ul className="text-lg">
              <li>Adults: $30</li>
            </ul>
          </div>
          {/* 18 Holes */}
          <div>
            <h2 className="text-2xl font-bold mb-2">18 Holes</h2>
            <ul className="text-lg">
              <li>Adults: $45</li>
            </ul>
          </div>
        </div>
         {/* Golf Cart Fee */}
         <h1 className="text-3xl font-bold mb-8">Golf Cart Fee</h1>
        <div className="flex flex-row justify-center gap-24 mb-12">
          {/* Riding Cart */}
          <div>
            <h2 className="text-2xl font-bold mb-2">Riding Cart</h2>
            <ul className="text-lg">
              <li>9 Holes: $15</li>
              <li>18 Holes: $22</li>
            </ul>
          </div>
          {/* Push Cart */}
          <div>
            <h2 className="text-2xl font-bold mb-2">Push Cart</h2>
            <ul className="text-lg">
              <li>9 Holes: $5</li>
              <li>18 Holes: $8</li>
            </ul>
          </div>
        </div>

        {/* Driving Range */}
        <h1 className="text-3xl font-bold mb-8">Driving Range</h1>
        <div className="flex flex-col items-center">
          <ul className="text-lg">
            <li>Small Bucket(40 Balls): $5</li>
            <li>Large Bucket(70 Balls): $10</li>
          </ul>
        </div>

      </main>
      <FooterSection />
    </>
  );
}   
