'use client'

import { useState, useEffect } from 'react'

export default function MyReservations() {
  const [reservations, setReservations] = useState([])

  useEffect(() => {
    const storedReservations = JSON.parse(localStorage.getItem('reservations') || '[]')
    setReservations(storedReservations)
  }, [])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  if (reservations.length === 0) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold text-[#008B8B] mb-4">رزروهای من</h2>
        <p className="text-gray-600">شما هنوز هیچ رزروی ندارید.</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-[#008B8B] mb-6">رزروهای من</h2>
      <div className="space-y-4">
        {reservations.map((reservation) => (
          <div key={reservation.id} className="venue-card">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-[#008B8B]">{reservation.venueName}</h3>
                <p className="text-gray-600 mt-2">ساعت: {reservation.timeSlot}</p>
                <p className="text-gray-600">نام: {reservation.name}</p>
                <p className="text-gray-600">شماره تم: {reservation.phone}</p>
              </div>
              <div className="text-sm text-gray-500">
                {formatDate(reservation.date)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 