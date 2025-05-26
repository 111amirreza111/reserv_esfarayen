'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function MyReservations() {
  const router = useRouter()
  const [reservations, setReservations] = useState([])

  useEffect(() => {
    // بررسی وضعیت لاگین
    const userRole = localStorage.getItem('userRole')
    if (!userRole) {
      router.push('/login')
      return
    }

    const storedReservations = JSON.parse(localStorage.getItem('reservations') || '[]')
    setReservations(storedReservations)
  }, [router])

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }
    return new Date(dateString).toLocaleDateString('fa-IR', options)
  }

  if (reservations.length === 0) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-[#1a1a2e]">رزروهای من</h1>
          <div className="text-center text-[#2d3436]">
            <p className="text-xl">شما هنوز هیچ رزروی ندارید.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-[#1a1a2e]">رزروهای من</h1>
        <div className="space-y-6">
          {reservations.map((reservation) => (
            <div key={reservation.id} className="reservation-card">
              <h3 className="text-xl font-bold mb-4 text-[#1a1a2e]">{reservation.venueName}</h3>
              <div className="space-y-2">
                <p className="text-[#2d3436]">
                  <span className="font-bold">ساعت رزرو:</span> {reservation.timeSlot}
                </p>
                <p className="text-[#2d3436]">
                  <span className="font-bold">نام:</span> {reservation.name}
                </p>
                <p className="text-[#2d3436]">
                  <span className="font-bold">شماره تم:</span> {reservation.phoneNumber}
                </p>
                <p className="reservation-date">
                  <span className="font-bold">تاریخ رزرو:</span> {formatDate(reservation.date)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 