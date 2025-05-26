import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'سیستم رزرو',
  description: 'سیستم رزرو',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <nav className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <h1 className="text-2xl font-bold bg-gradient-to-l from-[#6366f1] to-[#818cf8] bg-clip-text text-transparent">
                رزرو سالن
              </h1>
              <div className="flex items-center space-x-6 space-x-reverse">
                <Link href="/" className="nav-link">رزرو</Link>
                <Link href="/my-reservations" className="nav-link">رزرو شده ها</Link>
              </div>
            </div>
          </div>
        </nav>
        <main className="container mx-auto p-4">
          {children}
        </main>
      </body>
    </html>
  )
}
