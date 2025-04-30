'use client';
import { useState } from 'react';
import Swal from 'sweetalert2';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignupModal({ isOpen, onClose }: SignupModalProps) {
  const [full_name, setFullName] = useState('');
  const [email_address, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name,
          email_address,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Show error popup for failed signup
        await Swal.fire({
          title: 'Signup Failed',
          text: data.message || 'Something went wrong. Please try again.',
          icon: 'error',
          confirmButtonText: 'Try Again',
          confirmButtonColor: '#d33',
          customClass: {
            popup: 'rounded-lg',
            title: 'text-2xl font-bold',
            htmlContainer: 'text-lg',
          },
        });
        throw new Error(data.message || 'Something went wrong');
      }

      // Show success popup using SweetAlert2
      await Swal.fire({
        title: 'Success!',
        text: 'You have successfully signed up. Please log in.',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#3085d6',
        customClass: {
          popup: 'rounded-lg',
          title: 'text-2xl font-bold',
          htmlContainer: 'text-lg',
        },
      });

      // Clear form and close modal
      setFullName('');
      setEmail('');
      setPassword('');
      onClose();

    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-8">Sign Up</h2>
        
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-600 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block">
              <span className="text-red-500">*</span>Full Name
            </label>
            <input
              type="text"
              value={full_name}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>

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

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors"
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
