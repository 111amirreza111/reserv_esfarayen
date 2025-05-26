'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import venuesData from '../data/venues.json'

export default function Home() {
  const [venues, setVenues] = useState([])

  useEffect(() => {
    setVenues(venuesData.venues)
  }, [])

  return (
    <div className="space-y-8">
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {venues.map((venue) => (
          <div key={venue.id} className="venue-card">
            <div className="aspect-w-16 aspect-h-9 mb-4">
              <img
                src={venue.image}
                alt={venue.name}
                className="object-cover rounded-lg w-full h-48"
              />
            </div>
            <h3 className="text-xl font-semibold text-[#008B8B] mb-2">{venue.name}</h3>
            <p className="text-gray-600 mb-4">{venue.description}</p>
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
  )
}
