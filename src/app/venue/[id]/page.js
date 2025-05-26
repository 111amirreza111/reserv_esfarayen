'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import venueData from '@/data/venues.json'

export default function VenuePage({ params }) {
  const router = useRouter()
  const [venue, setVenue] = useState(null)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('')
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [error, setError] = useState('')
  const [reservations, setReservations] = useState([])

  useEffect(() => {
    // بررسی وضعیت لاگین
    const userRole = localStorage.getItem('userRole')
    if (!userRole) {
      router.push('/login')
      return
    }

    // بارگذاری داده‌ها از localStorage یا فایل
    const savedVenues = localStorage.getItem('venues')
    let venues
    if (savedVenues) {
      venues = JSON.parse(savedVenues)
    } else {
      venues = venueData.venues
    }

    const foundVenue = venues.find(v => v.id === parseInt(params.id))
    if (foundVenue) {
      setVenue(foundVenue)
    } else {
      router.push('/')
    }

    // بارگذاری رزروها
    const savedReservations = JSON.parse(localStorage.getItem('reservations') || '[]')
    setReservations(savedReservations)
  }, [params.id, router])

  const isTimeSlotReserved = (timeSlot) => {
    return reservations.some(
      r => r.venueId === venue.id && r.timeSlot === timeSlot
    )
  }

  const handleReservation = () => {
    if (!selectedTimeSlot || !name || !phoneNumber) {
      setError('لطفا تمام فیلدها را پر کنید')
      return
    }

    // بررسی رزرو نبودن ساعت
    if (isTimeSlotReserved(selectedTimeSlot)) {
      setError('این ساعت قبلاً رزرو شده است')
      return
    }

    const reservation = {
      id: Date.now(),
      venueId: venue.id,
      venueName: venue.name,
      timeSlot: selectedTimeSlot,
      name,
      phoneNumber,
      date: new Date().toISOString()
    }

    // Get existing reservations
    const existingReservations = JSON.parse(localStorage.getItem('reservations') || '[]')
    
    // Add new reservation
    const updatedReservations = [...existingReservations, reservation]
    localStorage.setItem('reservations', JSON.stringify(updatedReservations))

    // Redirect to my reservations page
    router.push('/my-reservations')
  }

  if (!venue) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-[#1a1a2e]">در حال بارگذاری...</div>
      </div>
    )
  }

  // فیلتر کردن ساعت‌های رزرو شده
  const availableTimeSlots = venue.timeSlots.filter(timeSlot => !isTimeSlotReserved(timeSlot))

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="venue-card">
          <h2 className="text-3xl font-bold mb-6 text-[#1a1a2e]">{venue.name}</h2>
          <p className="mb-8 text-[#2d3436]">{venue.description}</p>

          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-[#1a1a2e]">انتخاب ساعت رزرو:</h3>
            {availableTimeSlots.length === 0 ? (
              <p className="text-red-500">هیچ ساعت خالی برای رزرو وجود ندارد</p>
            ) : (
              <div className="flex flex-wrap gap-4">
                {availableTimeSlots.map((timeSlot) => (
                  <button
                    key={timeSlot}
                    onClick={() => setSelectedTimeSlot(timeSlot)}
                    className={`time-slot ${selectedTimeSlot === timeSlot ? 'selected' : ''}`}
                  >
                    {timeSlot}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-[#2d3436] font-bold mb-2">نام و نام خانوادگی:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 rounded-xl border-2 border-[#06beb6] focus:outline-none focus:border-[#48b1f3]"
                placeholder="نام خود را وارد کنید"
              />
            </div>
            <div>
              <label className="block text-[#2d3436] font-bold mb-2">شماره دانشجویی:</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full p-3 rounded-xl border-2 border-[#06beb6] focus:outline-none focus:border-[#48b1f3]"
                placeholder="شماره دانشجویی خود را وارد کنید"
              />
            </div>
          </div>

          {error && <p className="text-red-500 mt-4">{error}</p>}

          <button
            onClick={handleReservation}
            className="btn-primary w-full mt-8"
            disabled={availableTimeSlots.length === 0}
          >
            ثبت رزرو
          </button>
        </div>
      </div>
    </div>
  )
} 