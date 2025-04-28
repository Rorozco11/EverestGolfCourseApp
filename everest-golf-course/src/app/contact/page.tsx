'use client'
import Image from 'next/image';
import Navbar from "../components/NavbarHome"
import FooterSection from "../components/Footer"
import { FormEvent } from 'react';

export default function Contact() {
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
          src="/Images/BetterRes.jpg"
          alt="Home background"
          fill
            className="object-cover fixed -z-10"
          />
          
          <div className="container mx-auto py-16 px-4">
            <div className="bg-white/90 p-8 rounded-lg shadow-lg backdrop-blur-sm">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Contact Form */}
                <div>
                  <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
                  
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
                        Questions/Comments
                      </label>
                      <textarea
                        className="w-full p-2 border border-gray-300 rounded h-32"
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

                {/* Map and Contact Info */}
                <div className="space-y-6">
                  {/* Embed Google Maps */}
                  <div className="h-[400px] w-full rounded-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=YOUR_GOOGLE_MAPS_EMBED_URL"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>

                  {/* Contact Information */}
                  <div className="bg-white/80 p-6 rounded-lg">
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold">Hours of Operation</h3>
                        <p>Everyday 8AM - 6PM</p>
                      </div>
                      <div>
                        <h3 className="font-semibold">Location</h3>
                        <p>300 Everest Road, Nepal 06044</p>
                      </div>
                      <div>
                        <h3 className="font-semibold">Phone Number</h3>
                        <p>629-299-1555</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </main>
    <FooterSection />
    </>
  );
}
