"use client";
import { useState } from "react";
import { FaBars, FaInstagram, FaFacebook, FaEnvelope, FaPhone } from "react-icons/fa";
import Link from "next/link";

export default function MobileNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-end p-4">
      <button
        className="text-white bg-black bg-opacity-40 rounded-lg p-3"
        onClick={() => setOpen(!open)}
        aria-label="Open menu"
      >
        <FaBars size={32} />
      </button>
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex flex-col items-end p-6 z-50">
          <button
            className="mb-8 text-white text-3xl"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            ×
          </button>
          <div className="flex flex-col gap-6 text-white text-lg">
            <Link href="/" onClick={() => setOpen(false)}>Home</Link>
            <Link href="/booking" onClick={() => setOpen(false)}>Book a Tee Time</Link>
            {/* Add more links as needed */}
            <div className="flex flex-col gap-4 mt-8">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram size={24} /></a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook size={24} /></a>
              <a href="mailto:info@everestgolf.com"><FaEnvelope size={24} /></a>
              <a href="tel:+123456789"><FaPhone size={24} /></a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}