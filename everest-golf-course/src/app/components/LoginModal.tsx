// src/app/components/LoginModal.tsx
'use client';
import { useState } from 'react';
import SignupModal from './SignupModal';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSignup, setShowSignup] = useState(false);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-3xl font-bold text-center mb-8">Login</h2>
          
          <form className="space-y-6">
            <div>
              <label className="block">
                <span className="text-red-500">*</span>Email Address
              </label>
              <input
                type="email"
                value={email}
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

            <div className="text-blue-600 hover:underline cursor-pointer">
              <span>Forgot Password</span>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors"
              >
                Log In
              </button>
              <button
                type="button"
                onClick={onClose}
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
    </>
  );
}