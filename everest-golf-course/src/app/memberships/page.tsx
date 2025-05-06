'use client'
import Image from 'next/image';
import Navbar from "../components/NavbarHome"
import MobileNavbar from "../components/MobileNavbar"
import FooterSection from "../components/Footer"
import MobileFooter from '../components/MobileFooter';
import { FormEvent, useState } from 'react';
import Swal from 'sweetalert2';


export default function Memberships() {
  const [formData, setFormData] = useState({
    full_name: '',
    phone_number: '',
    email_address: '',
    town: '',
    comments: ''
  });

  // Add this state for validation errors
  const [errors, setErrors] = useState({
    phone_number: '',
    email_address: ''
  });

  // Phone number validation and formatting
  const formatPhoneNumber = (value: string) => {
    // Remove all non-numeric characters
    const phone_number = value.replace(/\D/g, '');

    // Format as (XXX) XXX-XXXX
    if (phone_number.length >= 10) {
      return `(${phone_number.slice(0, 3)}) ${phone_number.slice(3, 6)}-${phone_number.slice(6, 10)}`;
    }
    return phone_number;
  };

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
    return phoneRegex.test(phone);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validate before submitting
    if (!validatePhoneNumber(formData.phone_number)) {
      setErrors(prev => ({
        ...prev,
        phone_number: 'Please enter a valid phone number: (XXX) XXX-XXXX'
      }));
      return;
    }

    if (!validateEmail(formData.email_address)) {
      setErrors(prev => ({
        ...prev,
        email_address: 'Please enter a valid email address'
      }));
      return;
    }

    try {
      const response = await fetch('/api/memberships', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      // Show success message
      await Swal.fire({
        title: 'Success!',
        text: 'Your form has been sent to the Everest Golf team',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#16a34a',
        customClass: {
          popup: 'rounded-lg',
          title: 'text-2xl font-bold',
          htmlContainer: 'text-lg',
        },
      });

      // Reset form
      setFormData({
        full_name: '',
        phone_number: '',
        email_address: '',
        town: '',
        comments: ''
      });
    } catch (error) {
      await Swal.fire({
        title: 'Error',
        text: 'Failed to submit form. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#d33',
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'phone_number') {
      // Format phone number as user types
      const formattedPhone = formatPhoneNumber(value);
      setFormData(prev => ({
        ...prev,
        [name]: formattedPhone
      }));

      // Validate phone number
      if (!validatePhoneNumber(formattedPhone) && formattedPhone.length > 0) {
        setErrors(prev => ({
          ...prev,
          phone_number: 'Please enter a valid phone number: (XXX) XXX-XXXX'
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          phone_number: ''
        }));
      }
    } else if (name === 'email_address') {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));

      // Validate email
      if (!validateEmail(value) && value.length > 0) {
        setErrors(prev => ({
          ...prev,
          email_address: 'Please enter a valid email address'
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          email_address: ''
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <>
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="block md:hidden">
        <MobileNavbar />
      </div>
      <main className="relative min-h-screen w-full pt-[2rem] md:pt-[var(--navbar-height)]">
          <Image
            src="/Images/memthird.jpg"
            alt="Home background"
            fill
            className="object-cover fixed -z-10"
          />

          {/* Membership Form */}
          <div className="container  md:mx-auto md:py-16">
            <div className="max-w-[500px] mx-auto bg-white/90 p-8 rounded-lg shadow-lg backdrop-blur-sm mt-32 md:mt-0">
              <h1 className="text-3xl font-bold mb-6 text-center">Membership Info</h1>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block mb-1">
                    <span className="text-red-500">*</span>Full Name
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
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
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    placeholder="(XXX) XXX-XXXX"
                    required
                    className={`w-full p-2 border rounded ${errors.phone_number
                      }`}
                  />
                </div>

                <div>
                  <label className="block mb-1">
                    <span className="text-red-500">*</span>Email Address
                  </label>
                  <input
                    type="email"
                    name="email_address"
                    value={formData.email_address}
                    onChange={handleChange}
                    placeholder="example@gmail.com"
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
                    name="town"
                    value={formData.town}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>

                <div>
                  <label className="block mb-1">
                    Other Questions/Comments
                  </label>
                  <textarea
                    name="comments"
                    value={formData.comments}
                    onChange={handleChange}
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
      </main>
      <div className="hidden md:block">
        <FooterSection />
      </div>
      <div className="block md:hidden">
        <MobileFooter textColor="white" />
      </div>
    </>
  );
}
