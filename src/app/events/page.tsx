'use client'

import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import EventCarousel from '@/components/EventCarousel'

export default function EventsPage() {
  const { user } = useAuth()

  const handleBookingClick = (eventId: number) => {
    if (!user) {
      window.location.href = `/login?redirect=${encodeURIComponent(`/booking?eventId=${eventId}`)}&message=booking`
      return
    }
    window.location.href = `/booking?eventId=${eventId}`
  }

  const handleGroupBookingClick = () => {
    if (!user) {
      window.location.href = `/login?redirect=${encodeURIComponent('/booking?type=group')}&message=booking`
      return
    }
    window.location.href = '/booking?type=group'
  }
  const events = [
    {
      id: 1,
      title: "Führung: Schulzeit in Ernsthausen",
      description: "Entdecken Sie die Geschichte der Bildung in unserer Region mit einem erfahrenen Guide.",
      date: "2024-08-30",
      time: "14:00",
      duration: 90,
      maxParticipants: 20,
      currentParticipants: 12,
      price: 12.00,
      eventType: "GUIDED_TOUR",
      location: "Hauptgebäude, Erdgeschoss",
      exhibitionId: 1
    },
    {
      id: 2,
      title: "Workshop: Schreiben mit der Feder",
      description: "Lernen Sie die Kunst des Schreibens mit historischen Schreibfedern kennen.",
      date: "2024-09-05",
      time: "10:00",
      duration: 120,
      maxParticipants: 15,
      currentParticipants: 8,
      price: 18.00,
      eventType: "WORKSHOP",
      location: "Workshop-Raum 1",
      exhibitionId: 1
    },
    {
      id: 3,
      title: "Vortrag: Geschichte der Dorfschule",
      description: "Ein spannender Vortrag über die Entwicklung des Bildungswesens in Ernsthausen.",
      date: "2024-09-12",
      time: "19:00",
      duration: 60,
      maxParticipants: 50,
      currentParticipants: 23,
      price: 8.00,
      eventType: "LECTURE",
      location: "Vortragssaal",
      exhibitionId: null
    },
    {
      id: 4,
      title: "Gruppenführung für Schulklassen",
      description: "Spezielle Führung für Schulklassen mit interaktiven Elementen.",
      date: "2024-09-18",
      time: "09:00",
      duration: 120,
      maxParticipants: 30,
      currentParticipants: 0,
      price: 8.00,
      eventType: "GROUP_VISIT",
      location: "Gesamtes Museum",
      exhibitionId: 1
    }
  ]

  const getEventTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      'GUIDED_TOUR': 'Führung',
      'WORKSHOP': 'Workshop',
      'LECTURE': 'Vortrag',
      'SPECIAL_EVENT': 'Sonderevent',
      'GROUP_VISIT': 'Gruppenbesuch'
    }
    return types[type] || type
  }

  const getAvailableSpots = (max: number, current: number) => max - current

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Carousel Section */}
      <section className="relative">
        <EventCarousel />
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
          <div className="text-center text-white px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
              Veranstaltungen & Führungen
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto drop-shadow-md">
              Erleben Sie unser Museum bei einer Führung, Workshop oder einem spannenden Vortrag
            </p>
          </div>
        </div>
      </section>

      {/* Filter & Search */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                Alle
              </button>
              <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold">
                Führungen
              </button>
              <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold">
                Workshops
              </button>
              <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold">
                Vorträge
              </button>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="date"
                className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                min={new Date().toISOString().split('T')[0]}
              />
              <select className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Verfügbarkeit</option>
                <option>Verfügbar</option>
                <option>Ausgebucht</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {events.map((event) => {
              const availableSpots = getAvailableSpots(event.maxParticipants, event.currentParticipants)
              const isFullyBooked = availableSpots <= 0
              
              return (
                <div key={event.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          event.eventType === 'GUIDED_TOUR' ? 'bg-blue-100 text-blue-800' :
                          event.eventType === 'WORKSHOP' ? 'bg-green-100 text-green-800' :
                          event.eventType === 'LECTURE' ? 'bg-purple-100 text-purple-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {getEventTypeLabel(event.eventType)}
                        </span>
                        {isFullyBooked && (
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Ausgebucht
                          </span>
                        )}
                      </div>
                      <span className="text-2xl font-bold text-blue-600">{event.price.toFixed(2)}€</span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {event.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4">
                      {event.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <div className="flex items-center text-gray-500 mb-1">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Datum
                        </div>
                        <div className="font-medium">
                          {new Date(event.date).toLocaleDateString('de-DE', {
                            weekday: 'long',
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                          })}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center text-gray-500 mb-1">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Uhrzeit
                        </div>
                        <div className="font-medium">{event.time} Uhr</div>
                      </div>
                      <div>
                        <div className="flex items-center text-gray-500 mb-1">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          Verfügbar
                        </div>
                        <div className={`font-medium ${availableSpots <= 5 ? 'text-orange-600' : 'text-green-600'}`}>
                          {availableSpots} von {event.maxParticipants} Plätzen
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center text-gray-500 mb-1">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Ort
                        </div>
                        <div className="font-medium">{event.location}</div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Link
                        href={`/events/${event.id}`}
                        className="flex-1 text-center bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                      >
                        Details ansehen
                      </Link>
                      <button
                        onClick={() => handleBookingClick(event.id)}
                        disabled={isFullyBooked}
                        className={`flex-1 text-center py-2 px-4  rounded-lg font-medium transition-colors ${
                          isFullyBooked 
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      >
                        {isFullyBooked ? 'Ausgebucht' : user ? 'Jetzt buchen' : 'Anmelden & Buchen'}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Group Booking CTA */}
      <section className="bg-blue-50 py-12">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Gruppenbesuch planen?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Für Schulklassen, Vereine oder größere Gruppen bieten wir spezielle Führungen 
            und Workshops an. Kontaktieren Sie uns für ein individuelles Angebot.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleGroupBookingClick}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              {user ? 'Gruppenbesuch anfragen' : 'Anmelden & Gruppenbesuch anfragen'}
            </button>
            <Link
              href="/contact"
              className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
            >
              Kontakt aufnehmen
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
