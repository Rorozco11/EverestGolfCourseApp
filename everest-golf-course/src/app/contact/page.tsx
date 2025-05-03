'use client'
import Image from 'next/image';
import Navbar from "../components/NavbarHome"
import FooterSection from "../components/Footer"
import { FormEvent, useState } from 'react';
import Swal from 'sweetalert2';

export default function Contact() {
  const [formData, setFormData] = useState({
    full_name: '',
    phone_number: '',
    email_address: '',
    message: ''
  });

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
      return `(${phone_number.slice(0,3)}) ${phone_number.slice(3,6)}-${phone_number.slice(6,10)}`;
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
    } else if (name === 'email') {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));

      // Validate email as user types
      if (!validateEmail(value) && value.length > 0) {
        setErrors(prev => ({
          ...prev,
          email: 'Please enter a valid email address'
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          email: ''
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
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

    // Reset the form
    setFormData({
      full_name: '',
      phone_number: '',
      email_address: '',
      message: ''
    });
    setErrors({
      phone_number: '',
      email_address: ''
    });

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
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
                        className={`w-full p-2 border rounded ${
                          errors.phone_number ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.phone_number && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone_number}</p> 
                      )}
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
                        className={`w-full p-2 border rounded ${
                          errors.email_address ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.email_address && (
                        <p className="text-red-500 text-sm mt-1">{errors.email_address}</p>
                      )}
                    </div>

                    <div>
                      <label className="block mb-1">
                        Questions/Comments
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
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
