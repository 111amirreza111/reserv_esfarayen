'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import venueData from '@/data/venues.json'

export default function Home() {
  const router = useRouter()
  const [venues, setVenues] = useState([])

  useEffect(() => {
    // بررسی وضعیت لاگین
    const userRole = localStorage.getItem('userRole')
    if (!userRole) {
      router.push('/login')
      return
    }

    // بارگذاری داده‌ها از localStorage یا فایل
    const savedVenues = localStorage.getItem('venues')
    if (savedVenues) {
      setVenues(JSON.parse(savedVenues))
    } else {
      setVenues(venueData.venues)
    }
  }, [router])

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {venues.map((venue) => (
            <div key={venue.id} className="venue-card">
              <img
                src={venue.image}
                alt={venue.name}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <h3 className="text-xl font-bold mb-2">{venue.name}</h3>
              <p className="mb-4">{venue.description}</p>
              <Link
                href={`/venue/${venue.id}`}
                className="btn-primary block text-center"
              >
                رزرو سالن
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
