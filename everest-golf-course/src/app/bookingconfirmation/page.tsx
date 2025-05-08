'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/NavbarHome';
import FooterSection from '../components/Footer';
import MobileNavbar from '../components/MobileNavbar';

interface TeeTimeDetails {
  times: string;
  holes: string;
  players: number;
  price: number;
  MEMBER?: number;
}

interface User {
  email_address: string;
}

export default function BookingConfirmation() {
  const router = useRouter();
  const [teeTimeDetails, setTeeTimeDetails] = useState<TeeTimeDetails | null>(null);
  const [userEmail, setUserEmail] = useState<string>('');

  useEffect(() => {
    // Get booking details from session storage
    const storedDetails = sessionStorage.getItem('teeTimeDetails');
    const userCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('user='));
    
    if (userCookie) {
      const user: User = JSON.parse(decodeURIComponent(userCookie.split('=')[1]));
      setUserEmail(user.email_address);
    }

    if (storedDetails) {
      setTeeTimeDetails(JSON.parse(storedDetails));
    } else {
      // If no details found, redirect back to booking
      router.push('/booking');
    }
  }, [router]);

  if (!teeTimeDetails) {
    return null;
  }

  return (
    <>
      <div className = "Hidden md:block">     
        <Navbar />
      </div>
      <div className = "block md:hidden">
        <MobileNavbar />
      </div>
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-600 mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600">Thank you for booking with Everest Golf Course</p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Booking Details</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between py-3 border-b">
              <span className="text-gray-600">Tee Time:</span>
              <span className="font-medium">{teeTimeDetails.times}</span>
            </div>
            
            <div className="flex justify-between py-3 border-b">
              <span className="text-gray-600">Number of Holes:</span>
              <span className="font-medium">{teeTimeDetails.holes}</span>
            </div>
            
            <div className="flex justify-between py-3 border-b">
              <span className="text-gray-600">Number of Players:</span>
              <span className="font-medium">{teeTimeDetails.players}</span>
            </div>
            
            <div className="flex justify-between py-3 border-b">
              <span className="text-gray-600">Total Amount:</span>
              {teeTimeDetails.MEMBER === 1 ? (
                <span className="font-medium">Free</span>
              ) : (
                <span className="font-medium">${teeTimeDetails.price}</span>
              )}
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              A confirmation email with your booking details has been sent to your registered email address.
            </p>
            <button
              onClick={() => router.push('/booking')}
              className="bg-green-600 text-white py-3 px-8 rounded-lg hover:bg-green-700 transition-colors"
            >
              Book Another Tee Time
            </button>
          </div>
        </div>
      </main>
      <div className = "Hidden md:block"> 
        <FooterSection />
      </div>
    </>
  );
}
