"use client";
import { useState } from "react";
import { FaBars, FaInstagram, FaFacebook, FaEnvelope, FaPhone } from "react-icons/fa";
import Link from "next/link";

export default function MobileNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 right-0 w-full z-50 flex justify-end pr-7">
      <button
        className="text-white bg-black bg-opacity-40 rounded-lg p-3"
        onClick={() => setOpen(!open)}
        aria-label="Open menu"
      >
        <FaBars size={32} />
      </button>
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-50">
          <button
            className="absolute top-6 right-6 text-white text-3xl"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            ×
          </button>
          <div className="flex flex-col gap-8 text-white text-2xl font-semibold items-center">
            <Link href="/" onClick={() => setOpen(false)}>HOME</Link>
            <Link href="/rates" onClick={() => setOpen(false)}>RATES</Link>
            <Link href="/memberships" onClick={() => setOpen(false)}>MEMBERSHIPS</Link>
            <Link href="/contact" onClick={() => setOpen(false)}>CONTACT</Link>
            <Link href="/booking" onClick={() => setOpen(false)}>
              <span className="bg-green-700 px-6 py-2 rounded-xl text-white hover:bg-green-800 transition-colors">
                BOOK A TEE TIME
              </span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}