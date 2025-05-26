'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import venueData from '@/data/venues.json';

export default function AdminDashboard() {
  const router = useRouter();
  const [venues, setVenues] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [timeSlotInputs, setTimeSlotInputs] = useState({});
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [newVenue, setNewVenue] = useState({
    name: '',
    description: '',
    image: '/images/default-venue.jpg',
    timeSlots: []
  });
  const [reservations, setReservations] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  useEffect(() => {
    // بررسی نقش کاربر
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'admin') {
      router.push('/login');
      return;
    }

    // بارگذاری داده‌ها از localStorage یا فایل
    const savedVenues = localStorage.getItem('venues');
    if (savedVenues) {
      setVenues(JSON.parse(savedVenues));
    } else {
      setVenues(venueData.venues);
    }

    // بارگذاری رزروها
    const savedReservations = JSON.parse(localStorage.getItem('reservations') || '[]');
    setReservations(savedReservations);
  }, [router]);

  const handleAddTimeSlot = (venueId) => {
    const newTimeSlot = timeSlotInputs[venueId];
    if (!newTimeSlot) {
      setError('لطفا ساعت را وارد کنید');
      return;
    }

    // بررسی تکراری نبودن ساعت
    const venue = venues.find(v => v.id === venueId);
    if (venue.timeSlots.includes(newTimeSlot)) {
      setError('این ساعت قبلاً اضافه شده است');
      return;
    }

    // بررسی رزرو نبودن ساعت
    const isReserved = reservations.some(
      r => r.venueId === venueId && r.timeSlot === newTimeSlot
    );
    if (isReserved) {
      setError('این ساعت قبلاً رزرو شده است');
      return;
    }

    const updatedVenues = venues.map(venue => {
      if (venue.id === venueId) {
        return {
          ...venue,
          timeSlots: [...venue.timeSlots, newTimeSlot]
        };
      }
      return venue;
    });

    setVenues(updatedVenues);
    setTimeSlotInputs({ ...timeSlotInputs, [venueId]: '' });
    setError('');
    setIsEditing(true);
  };

  const handleRemoveTimeSlot = (venueId, timeSlot) => {
    // بررسی رزرو نبودن ساعت
    const isReserved = reservations.some(
      r => r.venueId === venueId && r.timeSlot === timeSlot
    );
    if (isReserved) {
      setError('این ساعت رزرو شده است و قابل حذف نیست');
      return;
    }

    const updatedVenues = venues.map(venue => {
      if (venue.id === venueId) {
        return {
          ...venue,
          timeSlots: venue.timeSlots.filter(slot => slot !== timeSlot)
        };
      }
      return venue;
    });

    setVenues(updatedVenues);
    setIsEditing(true);
  };

  const handleAddVenue = () => {
    if (!newVenue.name || !newVenue.description) {
      setError('لطفا نام و توضیحات سالن را وارد کنید');
      return;
    }

    const newVenueWithId = {
      ...newVenue,
      id: Date.now()
    };

    setVenues([...venues, newVenueWithId]);
    setNewVenue({
      name: '',
      description: '',
      image: '/images/default-venue.jpg',
      timeSlots: []
    });
    setIsEditing(true);
  };

  const handleSaveChanges = () => {
    localStorage.setItem('venues', JSON.stringify(venues));
    setIsEditing(false);
    alert('تغییرات با موفقیت ذخیره شد');
  };

  const handleLogout = () => {
    if (isEditing) {
      if (confirm('تغییرات ذخیره نشده است. آیا می‌خواهید خارج شوید؟')) {
        localStorage.removeItem('userRole');
        router.push('/login');
      }
    } else {
      localStorage.removeItem('userRole');
      router.push('/login');
    }
  };

  const isTimeSlotReserved = (venueId, timeSlot) => {
    return reservations.some(
      r => r.venueId === venueId && r.timeSlot === timeSlot
    );
  };

  const getReservationDetails = (venueId, timeSlot) => {
    return reservations.find(
      r => r.venueId === venueId && r.timeSlot === timeSlot
    );
  };

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateString).toLocaleDateString('fa-IR', options);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-[#1a1a2e]">داشبورد مدیریت</h1>
          <div className="flex gap-4">
            {isEditing && (
              <button onClick={handleSaveChanges} className="btn-primary bg-green-500 hover:bg-green-600">
                ذخیره تغییرات
              </button>
            )}
            <button onClick={handleLogout} className="btn-primary">
              خروج
            </button>
          </div>
        </div>

        {/* فرم افزودن سالن جدید */}
        <div className="venue-card mb-8">
          <h3 className="text-xl font-bold mb-4">افزودن سالن جدید</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#2d3436] font-bold mb-2">نام سالن:</label>
              <input
                type="text"
                value={newVenue.name}
                onChange={(e) => setNewVenue({...newVenue, name: e.target.value})}
                className="w-full p-3 rounded-xl border-2 border-[#06beb6] focus:outline-none focus:border-[#48b1f3]"
                placeholder="نام سالن را وارد کنید"
              />
            </div>
            <div>
              <label className="block text-[#2d3436] font-bold mb-2">توضیحات:</label>
              <input
                type="text"
                value={newVenue.description}
                onChange={(e) => setNewVenue({...newVenue, description: e.target.value})}
                className="w-full p-3 rounded-xl border-2 border-[#06beb6] focus:outline-none focus:border-[#48b1f3]"
                placeholder="توضیحات سالن را وارد کنید"
              />
            </div>
          </div>
          <button
            onClick={handleAddVenue}
            className="btn-primary mt-4"
          >
            افزودن سالن جدید
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {venues.map((venue) => (
            <div key={venue.id} className="venue-card">
              <h3 className="text-xl font-bold mb-4">{venue.name}</h3>
              <p className="mb-4">{venue.description}</p>
              
              <div className="mb-4">
                <h4 className="font-bold mb-2">ساعت‌های رزرو:</h4>
                <div className="flex flex-wrap gap-2">
                  {venue.timeSlots.map((timeSlot) => {
                    const isReserved = isTimeSlotReserved(venue.id, timeSlot);
                    const reservation = isReserved ? getReservationDetails(venue.id, timeSlot) : null;
                    
                    return (
                      <div key={timeSlot} className="flex flex-col gap-2 w-full">
                        <div className="flex items-center gap-2">
                          <span 
                            className={`time-slot flex-1 ${isReserved ? 'bg-red-500 text-white' : ''}`}
                            onClick={() => setSelectedTimeSlot(isReserved ? reservation : null)}
                          >
                            {timeSlot}
                            {isReserved && ' (رزرو شده)'}
                          </span>
                          {!isReserved && (
                            <button
                              onClick={() => handleRemoveTimeSlot(venue.id, timeSlot)}
                              className="text-red-500 hover:text-red-700"
                            >
                              ×
                            </button>
                          )}
                        </div>
                        {isReserved && selectedTimeSlot?.id === reservation?.id && (
                          <div className="bg-white/80 rounded-xl p-3 text-sm">
                            <p className="font-bold mb-1">جزئیات رزرو:</p>
                            <p>نام: {reservation.name}</p>
                            <p>شماره دانشجویی: {reservation.phoneNumber}</p>
                            <p>تاریخ رزرو: {formatDate(reservation.date)}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={timeSlotInputs[venue.id] || ''}
                  onChange={(e) => setTimeSlotInputs({ ...timeSlotInputs, [venue.id]: e.target.value })}
                  placeholder="ساعت جدید (مثال: 08:00-10:00)"
                  className="w-full p-3 rounded-xl border-2 border-[#06beb6] focus:outline-none focus:border-[#48b1f3]"
                />
                <button
                  onClick={() => handleAddTimeSlot(venue.id)}
                  className="btn-primary whitespace-nowrap"
                >
                  افزودن ساعت
                </button>
              </div>
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 