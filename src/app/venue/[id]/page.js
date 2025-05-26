'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import venuesData from '../../../data/venues.json'

export default function VenuePage({ params }) {
  const router = useRouter()
  const [venue, setVenue] = useState(null)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  useEffect(() => {
    const foundVenue = venuesData.venues.find(v => v.id === parseInt(params.id))
    if (foundVenue) {
      setVenue(foundVenue)
    }
  }, [params.id])

  const handleReservation = () => {
    if (!selectedTimeSlot || !name || !phone) {
      alert('لطفا تمام فیلدها را پر کنید')
      return
    }

    const reservation = {
      id: Date.now(),
      venueId: venue.id,
      venueName: venue.name,
      timeSlot: selectedTimeSlot,
      name,
      phone,
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
    return <div className="text-center">در حال بارگذاری...</div>
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-[#008B8B] mb-6">{venue.name}</h2>
      <p className="text-gray-600 mb-8">{venue.description}</p>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-[#008B8B] mb-4">انتخاب ساعت</h3>
        <div className="flex flex-wrap gap-2">
          {venue.timeSlots.map((timeSlot) => (
            <button
              key={timeSlot}
              className={`time-slot ${selectedTimeSlot === timeSlot ? 'selected' : ''}`}
              onClick={() => setSelectedTimeSlot(timeSlot)}
            >
              {timeSlot}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">نام و نام خانوادگی</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#40E0D0]"
            placeholder="نام خود را وارد کنید"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">شماره تم</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#40E0D0]"
            placeholder="شماره تم خود را وارد کنید"
          />
        </div>

        <button
          onClick={handleReservation}
          className="btn-primary w-full"
        >
          تکمیل رزرو
        </button>
      </div>
    </div>
  )
} 