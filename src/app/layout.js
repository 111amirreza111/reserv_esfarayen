import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'سیستم رزرو سالن ورزشی',
  description: 'سیستم رزرو سالن ورزشی با تم فیروزه‌ای',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <nav className="bg-white shadow-md p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold text-[#008B8B]">رزرو سالن ورزشی</h1>
            <div className="space-x-4">
              <Link href="/" className="nav-link">رزرو</Link>
              <Link href="/my-reservations" className="nav-link">رزروهای من</Link>
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
