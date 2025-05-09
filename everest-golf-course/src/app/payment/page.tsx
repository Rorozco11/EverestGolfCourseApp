'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import Navbar from '../components/NavbarHome';
import FooterSection from '../components/Footer';
import MobileNavbar from "../components/MobileNavbar"

interface TeeTimeDetails {
  times: string;
  holes: string;
  players: number;
  price: number;
  MEMBER?: number;
}

export default function PaymentPage() {
  const router = useRouter();
  const [teeTimeDetails, setTeeTimeDetails] = useState<TeeTimeDetails | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  useEffect(() => {
    const storedDetails = sessionStorage.getItem('teeTimeDetails');
    if (storedDetails) {
      const details = JSON.parse(storedDetails);
      setTeeTimeDetails(details);
      
      // If it's a member tee time, skip payment and go straight to confirmation
      if (details.MEMBER === 1) {
        sessionStorage.setItem('teeTimeDetails', JSON.stringify(details));
        router.push('/bookingconfirmation');
      }
    } else {
      router.push('/booking');
    }
  }, [router]);

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = value.replace(/(.{4})/g, '$1 ').trim();
    setCardNumber(formatted);
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 4) {
      if (value.length >= 2) {
        const month = value.slice(0, 2);
        if (parseInt(month) > 12) return;
        setExpiryDate(`${month}/${value.slice(2)}`);
      } else {
        setExpiryDate(value);
      }
    }
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setCvv(value);
  };

  const isFormValid = () => {
    return cardNumber.replace(/\s/g, '').length === 16 &&
           /^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(expiryDate) &&
           /^[0-9]{3,4}$/.test(cvv);
  };

  const handlePayment = async () => {
    if (!isFormValid()) {
      Swal.fire({
        title: 'Invalid Input',
        text: 'Please check your payment details and try again.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#3085d6',
      });
      return;
    }
    setIsProcessing(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success popup
      await Swal.fire({
        title: 'Payment Successful!',
        text: 'Your tee time has been booked successfully.',
        icon: 'success',
        confirmButtonText: 'View Booking',
        confirmButtonColor: '#3085d6',
        customClass: {
          popup: 'rounded-lg',
          title: 'text-2xl font-bold',
          htmlContainer: 'text-lg',
        },
      });

      // Store booking details in session storage and redirect to confirmation
      sessionStorage.setItem('teeTimeDetails', JSON.stringify(teeTimeDetails));
      router.push('/bookingconfirmation');
    } catch (error) {
      await Swal.fire({
        title: 'Payment Failed',
        text: 'There was an error processing your payment. Please try again.',
        icon: 'error',
        confirmButtonText: 'Try Again',
        confirmButtonColor: '#d33',
        customClass: {
          popup: 'rounded-lg',
          title: 'text-2xl font-bold',
          htmlContainer: 'text-lg',
        },
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (!teeTimeDetails) {
    return null;
  }

  return (
    <>
     <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="block md:hidden">
        <MobileNavbar />
      </div>
      <main className="max-w-4xl mx-auto mt-32 md:mt-16 px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Complete Your Booking</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Booking Details */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">Booking Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Time:</span>
                <span className="font-medium">{teeTimeDetails.times}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Holes:</span>
                <span className="font-medium">{teeTimeDetails.holes}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Players:</span>
                <span className="font-medium">{teeTimeDetails.players}</span>
              </div>
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total:</span>
                  <span>${teeTimeDetails.price}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Payment Form */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">Payment Information</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2">
                  <span className="text-red-500">*</span>Card Number
                </label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="1234 5678 9012 3456"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">
                    <span className="text-red-500">*</span>Expiry Date
                  </label>
                  <input
                    type="text"
                    value={expiryDate}
                    onChange={handleExpiryDateChange}
                    placeholder="MM/YY"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">
                    <span className="text-red-500">*</span>CVV
                  </label>
                  <input
                    type="text"
                    value={cvv}
                    onChange={handleCvvChange}
                    placeholder="123"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={handlePayment}
                  disabled={isProcessing || !isFormValid()}
                  className={`flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors ${
                    isProcessing || !isFormValid() ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isProcessing ? 'Processing...' : 'Pay Now'}
                </button>
                <button
                  type="button"
                  onClick={() => router.push('/booking')}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
     <div className="hidden md:block">
        <FooterSection />
      </div>
    </>
  );
}
