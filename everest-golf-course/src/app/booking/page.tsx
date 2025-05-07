'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from "../components/NavbarHome"
import MobileNavbar from "../components/MobileNavbar"
import FooterSection from "../components/Footer"
import LoginModal from '../components/LoginModal';
import { useRouter } from 'next/navigation';

interface TeeTime {
  times: string;
  holes: string;
  players: number;
  price: number;
  MEMBER?: number;
}

export default function Booking() {
  // ================== State ==================
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState<'morning' | 'afternoon' | 'anytime'>('anytime');
  const [players, setPlayers] = useState<number | 'any'>('any');
  const [holes, setHoles] = useState<'9' | '18' | 'any'>('any');
  const [teeType, setTeeType] = useState<'public' | 'membership'>('public');
  const [showDropdown, setShowDropdown] = useState(false);
  const [teeTimes, setTeeTimes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoadingTeeTimes, setIsLoadingTeeTimes] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [selectedTeeTime, setSelectedTeeTime] = useState<{
    times: string;
    holes: string;
    players: number;
    price: number;
  } | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchTeeTimes() {
      setLoading(true);
      setIsLoadingTeeTimes(true);
      try {
        const res = await fetch('/api/teetimes');
        const data = await res.json();
        setTeeTimes(data);
      } catch (error) {
        console.error('Error fetching tee times:', error);
      } finally {
        setLoading(false);
        setIsLoadingTeeTimes(false);
      }
    }
    fetchTeeTimes();
  }, []);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setIsLoadingTeeTimes(true);
    // Simulate loading time for better UX
    setTimeout(() => {
      setIsLoadingTeeTimes(false);
    }, 1000);
  };

  // ================== Helpers ==================
  // Helper to get days in month
  const getMonthDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1; // Monday as first day
    const daysArray = [];

    // Add empty slots for days before the 1st
    for (let i = 0; i < startDay; i++) {
      daysArray.push(null);
    }
    // Add days of the month
    for (let d = 1; d <= daysInMonth; d++) {
      daysArray.push(d);
    }
    return daysArray;
  };

  const days = getMonthDays(selectedDate);

  function formatTime(timeStr: string | undefined) {
    if (!timeStr) return '';
    const [hour, minute] = timeStr.split(':');
    const h = parseInt(hour, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    return `${hour12}:${minute} ${ampm}`;
  }

  function isMorning(timeStr: string) {
    const hour = parseInt(timeStr.split(':')[0], 10);
    return hour < 12;
  }

  function isAfternoon(timeStr: string) {
    const hour = parseInt(timeStr.split(':')[0], 10);
    return hour >= 12;
  }

  // ================== Filtering ==================
  const filteredTeeTimes = teeTimes.filter((tee) => {
    // Time filter
    if (selectedTime === 'morning' && !isMorning(tee.times)) return false;
    if (selectedTime === 'afternoon' && !isAfternoon(tee.times)) return false;
    // Holes filter
    if (holes !== 'any' && String(tee.holes) !== String(holes)) return false;
    // Players filter
    if (players !== 'any' && String(tee.players) !== String(players)) return false;
    // Member/Public filter
    if (teeType === 'membership' && tee.MEMBER == 0) return false;
    if (teeType === 'public' && tee.MEMBER == 1) return false;
    return true;
  });

  const handleBookClick = (teeTime: TeeTime) => {
    setSelectedTeeTime(teeTime);
    sessionStorage.setItem('teeTimeDetails', JSON.stringify(teeTime));
    router.push('/payment');
  };

  // ================== Render ==================
  return (
    <>
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="block md:hidden">
        <MobileNavbar />
      </div>  
      <main className="max-w-6xl mx-auto px-4 pt-navbar pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Calendar and Filters */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </h2>
                <div className="flex gap-2">
                  <button
                    className="p-2 hover:bg-gray-100 rounded"
                    onClick={() =>
                      setSelectedDate(
                        new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1)
                      )
                    }
                    aria-label="Previous Month"
                  >
                    &lt;
                  </button>
                  <button
                    className="p-2 hover:bg-gray-100 rounded"
                    onClick={() =>
                      setSelectedDate(
                        new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1)
                      )
                    }
                    aria-label="Next Month"
                  >
                    &gt;
                  </button>
                </div>
              </div>
              
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day) => (
                  <div key={day} className="text-center py-2 text-sm font-medium">
                    {day}
                  </div>
                ))}
                {days.map((day, idx) =>
                  day ? (
                    <button
                      key={idx}
                      className={`text-center py-2 w-full rounded ${
                        day === selectedDate.getDate() ? 'bg-green-500 text-white' : ''
                      }`}
                      onClick={() => handleDateChange(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day))}
                    >
                      {day}
                    </button>
                  ) : (
                    <div key={idx} />
                  )
                )}
              </div>
            </div>

            {/* Time Preference */}
            <div className="flex gap-4">
              <button
                className={`flex-1 py-3 px-6 rounded-lg border ${
                  selectedTime === 'morning' ? 'bg-green-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
                }`}
                onClick={() => setSelectedTime('morning')}
              >
                Morning
              </button>
              <button
                className={`flex-1 py-3 px-6 rounded-lg border ${
                  selectedTime === 'afternoon' ? 'bg-green-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
                }`}
                onClick={() => setSelectedTime('afternoon')}
              >
                Afternoon
              </button>
            </div>

            <button
              className={`w-full py-3 px-6 rounded-lg border mt-2 ${
                selectedTime === 'anytime' ? 'bg-green-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
              }`}
              onClick={() => setSelectedTime('anytime')}
            >
              Anytime
            </button>

            {/* Players and Holes Selection */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Players</h3>
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((num) => (
                  <button
                    key={num}
                    className={`px-6 py-2 rounded-full border ${
                      players === num ? 'bg-green-500 text-white' : 'bg-white hover:bg-gray-300'
                    }`}
                    onClick={() => setPlayers(num)}
                  >
                    {num}
                  </button>
                ))}
                <button
                  className={`px-6 py-2 rounded-full border ${
                    players === 'any' ? 'bg-green-500 text-white' : 'bg-white hover:bg-gray-300'
                  }`}
                  onClick={() => setPlayers('any' as any)}
                >
                  Any
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  className={`flex-1 py-2 px-4 rounded-full border ${
                    holes === '9' ? 'bg-green-500 text-white' : 'bg-white hover:bg-gray-300'
                  }`}
                  onClick={() => setHoles('9')}
                >
                  9 Holes
                </button>
                <button
                  className={`flex-1 py-2 px-4 rounded-full border ${
                    holes === '18' ? 'bg-green-500 text-white' : 'bg-white hover:bg-gray-300'
                  }`}
                  onClick={() => setHoles('18')}
                >
                  18 Holes
                </button>
                <button
                  className={`px-6 py-2 rounded-full border ${
                    holes === 'any' ? 'bg-green-500 text-white' : 'bg-white hover:bg-gray-300'
                  }`}
                  onClick={() => setHoles('any')}
                >
                  Any
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Tee Times */}
          <div className="flex flex-col h-full space-y-4">
            <div className="relative flex mb-4">
              <button
                className={`px-6 py-2 rounded bg-gray-200 hover:bg-gray-300 ${
                  teeType === 'public' ? 'bg-gray-200' : ''
                }`}
                onClick={() => setShowDropdown((prev) => !prev)}
              >
                {teeType === 'public' ? 'Public Tee Times' : 'Membership Tee Times'}
              </button>
              {showDropdown && (
                <div className="absolute left-0 top-full mt-2 w-full bg-white border rounded shadow z-10">
                  <button
                    className={`block w-full text-left px-6 py-2 
                      ${teeType === 'public' ? ' bg-gray-300' : 'bg-gray-100'} 
                      hover:bg-green-500 hover:text-white transition`}
                    onClick={() => {
                      setTeeType('public');
                      setShowDropdown(false);
                    }}
                  >
                    Public Tee Times
                  </button>
                  <button
                    className={`block w-full text-left px-6 py-2 
                      ${teeType === 'membership' ? 'bg-gray-300' : 'bg-gray-100'} 
                      hover:bg-green-500 hover:text-white transition`}
                    onClick={() => {
                      setTeeType('membership');
                      setShowDropdown(false);
                    }}
                  >
                    Membership Tee Times
                  </button>
                </div>
              )}
            </div>

            {/* Tee Time Slots */}
            {isLoadingTeeTimes ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
              </div>
            ) : (
              filteredTeeTimes.map((tee) => (
              <div
                  key={tee.id}
                  className="border p-4 rounded mb-2 flex items-center justify-between"
                >
                  {/* Left: Players and Holes */}
                  <div className="flex-1 text-left">
                    <div>{tee.holes} Holes</div>
                    <div>Players: {tee.players}</div>
                  </div>
                  {/* Center: Tee Time */}
                  <div className="flex-1 text-center font-bold text-lg">
                    {formatTime(tee.times)}
                  </div>
                  {/* Right: Book Button */}
                  <div className="flex-1 flex justify-end">
                    <button 
                      className="bg-green-600 text-white px-4 py-2 rounded"
                      onClick={() => handleBookClick(tee)}
                    >
                      Book
                    </button>
                  </div>
              </div>
              ))
            )}
          </div>
        </div>
      </main>
      <div className="hidden md:block">
        <FooterSection />
      </div>
      
      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        selectedTeeTime={selectedTeeTime || undefined}
      />
    </>
  )
}