'use client'
import Image from 'next/image';
import Navbar from "../components/NavbarHome"
import FooterSection from "../components/Footer"
import { FormEvent } from 'react';

export default function Memberships() {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission here
  };

  return (
    <>
      <Navbar />
      <main className="pt-[var(--navbar-height)]">
        <div className="relative min-h-screen w-full">
          <Image
            src="/Images/memthird.jpg"
            alt="Home background"
            fill
            className="object-cover fixed -z-10"
          />
          
          {/* Membership Form */}
          <div className="container mx-auto py-16">
            <div className="max-w-[500px] mx-auto bg-white/90 p-8 rounded-lg shadow-lg backdrop-blur-sm">
              <h1 className="text-3xl font-bold mb-6 text-center">Membership Info</h1>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block mb-1">
                    <span className="text-red-500">*</span>Full Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>

                <div>
                  <label className="block mb-1">
                    <span className="text-red-500">*</span>Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>

                <div>
                  <label className="block mb-1">
                    <span className="text-red-500">*</span>Email Address
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>

                <div>
                  <label className="block mb-1">
                    <span className="text-red-500">*</span>Town
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>

                <div>
                  <label className="block mb-1">
                    Other Questions/Comments
                  </label>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded h-24"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition-colors font-semibold"
                >
                  SUBMIT
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <FooterSection />
    </>
  );
}
