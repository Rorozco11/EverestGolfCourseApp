// src/app/components/LoginModal.tsx
'use client';
import { useState, useEffect } from 'react';
import SignupModal from './SignupModal';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import ForgotPasswordModal from './ForgotPasswordModal';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTeeTime?: {
    times: string;
    holes: string;
    players: number;
    price: number;
    MEMBER?: number;
  };
}

export default function LoginModal({ isOpen, onClose, selectedTeeTime }: LoginModalProps) {
  const router = useRouter();
  const [email_address, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSignup, setShowSignup] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    if (selectedTeeTime) {
      // Store tee time details and redirect to payment
      sessionStorage.setItem('teeTimeDetails', JSON.stringify(selectedTeeTime));
      router.push('/payment');
      onClose();
    }
  }, [isOpen, selectedTeeTime, router, onClose]);

  const handleClose = () => {
    setEmail('');
    setPassword('');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_address,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        await Swal.fire({
          title: 'Login Failed',
          text: data.error || 'Invalid email or password',
          icon: 'error',
          confirmButtonText: 'Try Again',
          confirmButtonColor: '#d33',
          customClass: {
            popup: 'rounded-lg',
            title: 'text-2xl font-bold',
            htmlContainer: 'text-lg',
          },
        });
        throw new Error(data.error || 'Failed to login');
      }

      // Check if user is trying to book a member tee time but isn't a member
      if (selectedTeeTime && selectedTeeTime.MEMBER === 1 && data.member === 0) {
        await Swal.fire({
          title: 'Membership Required',
          text: 'This tee time is for members only. Please select a public tee time.',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#d33',
          customClass: {
            popup: 'rounded-lg',
            title: 'text-2xl font-bold',
            htmlContainer: 'text-lg',
          },
        });
        onClose();
        return;
      }

      // Show success popup
      await Swal.fire({
        title: 'Welcome!',
        text: `Welcome ${email_address}`,
        icon: 'success',
        confirmButtonText: 'Continue',
        confirmButtonColor: '#3085d6',
        customClass: {
          popup: 'rounded-lg',
          title: 'text-2xl font-bold',
          htmlContainer: 'text-lg',
        },
      });

      // Store tee time details in session storage and redirect to payment page
      if (selectedTeeTime) {
        sessionStorage.setItem('teeTimeDetails', JSON.stringify(selectedTeeTime));
        router.push('/payment');
      } else {
        router.push('/booking');
      }
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[90]">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-3xl font-bold text-center mb-8">Login</h2>
          
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-600 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block">
                <span className="text-red-500">*</span>Email Address
              </label>
              <input
                type="email"
                value={email_address}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </div>

            <div>
              <label className="block">
                <span className="text-red-500">*</span>Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </div>

            <div 
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={() => setShowForgotPassword(true)}
            >
              <span>Forgot Password</span>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isLoading}
                className={`flex-1 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? 'Logging in...' : 'Log In'}
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition-colors"
              >
                Close
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t text-center">
            <p className="text-gray-600">Don't Have an Account?</p>
            <button
              type="button"
              onClick={() => setShowSignup(true)}
              className="mt-2 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>

      <SignupModal 
        isOpen={showSignup} 
        onClose={() => setShowSignup(false)} 
      />

      <ForgotPasswordModal 
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
      />
    </>
  );
}