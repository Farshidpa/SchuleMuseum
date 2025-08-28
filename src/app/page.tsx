'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/contexts/AuthContext'
import MuseumImageCarousel from '@/components/MuseumImageCarousel'

export default function HomePage() {
  const { user } = useAuth()

  const handleEventsClick = () => {
    if (!user) {
      window.location.href = `/login?redirect=${encodeURIComponent('/events')}&message=booking`
      return
    }
    window.location.href = '/events'
  }

  const handleExhibitionBookingClick = (exhibition: string) => {
    if (!user) {
      window.location.href = `/login?redirect=${encodeURIComponent(`/events?exhibition=${exhibition}`)}&message=booking`
      return
    }
    window.location.href = `/events?exhibition=${exhibition}`
  }
  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Hero Section with Carousel */}
      <section className="relative">
        <MuseumImageCarousel className="h-[600px] md:h-[700px]" />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
              Historisches Museum Ernsthausen
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto drop-shadow-md">
              Entdecken Sie die faszinierende Geschichte unserer Schule und Region
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/exhibitions"
                className="bg-white text-amber-800 px-8 py-3 rounded-lg font-semibold hover:bg-amber-50 transition-colors inline-block shadow-lg"
              >
                Ausstellungen entdecken
              </Link>
              <button
                onClick={handleEventsClick}
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-amber-800 transition-colors inline-block shadow-lg"
              >
                {user ? 'Veranstaltungen buchen' : 'Anmelden & Veranstaltungen buchen'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Was möchten Sie erleben?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Ausstellungen</h3>
            <p className="text-gray-600 mb-4">Erkunden Sie unsere historischen Sammlungen</p>
            <Link href="/exhibitions" className="text-amber-600 hover:text-amber-700 font-medium">
              Mehr erfahren →
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Veranstaltungen</h3>
            <p className="text-gray-600 mb-4">Führungen, Workshops und Events</p>
            <Link href="/events" className="text-blue-600 hover:text-blue-700 font-medium">
              Programm ansehen →
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Gruppenbuchungen</h3>
            <p className="text-gray-600 mb-4">Spezielle Angebote für Gruppen</p>
            <Link href="/booking?type=group" className="text-green-600 hover:text-green-700 font-medium">
              Gruppe anmelden →
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Besucherinfo</h3>
            <p className="text-gray-600 mb-4">Öffnungszeiten, Preise und Anfahrt</p>
            <Link href="/info" className="text-purple-600 hover:text-purple-700 font-medium">
              Informationen →
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Exhibition */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Aktuelle Sonderausstellung
              </h2>
              <h3 className="text-2xl font-semibold text-amber-600 mb-4">
                &ldquo;Schulzeit in Ernsthausen - 1900 bis 2000&rdquo;
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Eine faszinierende Reise durch 100 Jahre Bildungsgeschichte. 
                Entdecken Sie historische Schulbücher, Klassenzimmer-Ausstattung 
                und Geschichten von Schülern und Lehrern vergangener Zeiten.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/exhibitions/schulzeit-1900-2000"
                  className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors text-center"
                >
                  Ausstellung besuchen
                </Link>
                <button
                  onClick={() => handleExhibitionBookingClick('schulzeit')}
                  className="border border-amber-600 text-amber-600 px-6 py-3 rounded-lg hover:bg-amber-50 transition-colors text-center"
                >
                  {user ? 'Führung buchen' : 'Anmelden & Führung buchen'}
                </button>
              </div>
            </div>
            <div className="mt-8 lg:mt-0">
              <div className="bg-gradient-to-br from-amber-100 to-orange-200 rounded-xl p-8 h-80 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-amber-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-12 h-12 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <p className="text-amber-800 font-medium">Ausstellungsbild wird geladen...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-amber-600 mb-2">500+</div>
              <div className="text-gray-600">Historische Objekte</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">12</div>
              <div className="text-gray-600">Themenräume</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">1890</div>
              <div className="text-gray-600">Gründungsjahr der Schule</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">25.000+</div>
              <div className="text-gray-600">Besucher pro Jahr</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
