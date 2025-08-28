'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import DashboardCarousel from '@/components/DashboardCarousel'

interface Booking {
  id: string
  personalData: {
    firstName: string
    lastName: string
    email: string
    phone: string
  }
  bookingDetails: {
    eventType: string
    date: string
    time: string
    numberOfParticipants: number
    groupSize?: number
    isGroupBooking: boolean
    isSchoolGroup?: boolean
    specialRequests: string
    totalPrice: number
  }
  createdAt: string
}

export default function UserDashboard() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [userBookings, setUserBookings] = useState<Booking[]>([])
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [showModal, setShowModal] = useState(false)

  const loadUserBookings = useCallback(() => {
    try {
      const allBookings = JSON.parse(localStorage.getItem('museum_bookings') || '[]')
      const myBookings = allBookings.filter((booking: Booking) => 
        booking.personalData.email === user?.email
      )
      setUserBookings(myBookings)
    } catch (error) {
      console.error('Error loading bookings:', error)
    }
  }, [user?.email])

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login?redirect=/dashboard')
      return
    }

    if (user) {
      loadUserBookings()
    }
  }, [user, isLoading, router, loadUserBookings])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(price)
  }

  const openBookingDetails = (booking: Booking) => {
    setSelectedBooking(booking)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedBooking(null)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Lade...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Willkommen, {user.firstName}!
              </h1>
              <p className="text-gray-600">Hier ist Ihre persönliche Übersicht</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Schnellzugriff</h2>
              
              <Link
                href="/events"
                className="flex items-center p-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4m-8 4h16a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2z" />
                </svg>
                Neue Buchung
              </Link>

              <Link
                href="/exhibitions"
                className="flex items-center p-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Ausstellungen
              </Link>

              <Link
                href="/profile"
                className="flex items-center p-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Profil bearbeiten
              </Link>

              <Link
                href="/contact"
                className="flex items-center p-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Kontakt
              </Link>
            </div>

            {/* Museum Dashboard Carousel */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Schnellzugriff</h2>
              <DashboardCarousel />
            </div>
          </div>

          {/* Main Dashboard */}
          <div className="lg:col-span-3 space-y-8">
            
            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4m-8 4h16a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Meine Buchungen</p>
                    <p className="text-2xl font-bold text-gray-900">{userBookings.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-full">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Ausgaben gesamt</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatPrice(userBookings.reduce((sum, booking) => sum + booking.bookingDetails.totalPrice, 0))}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 rounded-full">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Favoriten</p>
                    <p className="text-2xl font-bold text-gray-900">0</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Meine Buchungen</h2>
                <Link
                  href="/bookings"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Alle anzeigen →
                </Link>
              </div>

              {userBookings.length === 0 ? (
                <div className="text-center py-8">
                  <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4m-8 4h16a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2z" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Noch keine Buchungen</h3>
                  <p className="text-gray-600 mb-4">Entdecken Sie unsere Ausstellungen und Veranstaltungen!</p>
                  <Link
                    href="/events"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Jetzt buchen
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {userBookings.slice(0, 3).map((booking) => (
                    <div key={booking.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{booking.bookingDetails.eventType}</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {booking.bookingDetails.date && `${booking.bookingDetails.date} um ${booking.bookingDetails.time}`}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            {booking.bookingDetails.isGroupBooking 
                              ? `Gruppe: ${booking.bookingDetails.groupSize} Personen`
                              : `${booking.bookingDetails.numberOfParticipants} Teilnehmer`
                            }
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">
                            {formatPrice(booking.bookingDetails.totalPrice)}
                          </p>
                          <button
                            onClick={() => openBookingDetails(booking)}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold min-w-[140px] mt-2"
                          >
                            Details ansehen
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Booking Details Modal */}
      {showModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Buchungsdetails</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                {/* Booking Info */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Buchungsinformationen</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Buchungs-ID:</span>
                      <p className="font-medium">{selectedBooking.id}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Erstellt am:</span>
                      <p className="font-medium">{formatDate(selectedBooking.createdAt)}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Veranstaltung:</span>
                      <p className="font-medium">{selectedBooking.bookingDetails.eventType}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Gesamtpreis:</span>
                      <p className="font-medium text-green-600">
                        {formatPrice(selectedBooking.bookingDetails.totalPrice)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Event Details */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Veranstaltungsdetails</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    {selectedBooking.bookingDetails.date && (
                      <div>
                        <span className="text-gray-600">Datum:</span>
                        <p className="font-medium">{selectedBooking.bookingDetails.date}</p>
                      </div>
                    )}
                    {selectedBooking.bookingDetails.time && (
                      <div>
                        <span className="text-gray-600">Uhrzeit:</span>
                        <p className="font-medium">{selectedBooking.bookingDetails.time}</p>
                      </div>
                    )}
                    <div>
                      <span className="text-gray-600">Teilnehmer:</span>
                      <p className="font-medium">
                        {selectedBooking.bookingDetails.isGroupBooking 
                          ? `${selectedBooking.bookingDetails.groupSize} Personen (Gruppe)`
                          : `${selectedBooking.bookingDetails.numberOfParticipants} Personen`
                        }
                      </p>
                    </div>
                    {selectedBooking.bookingDetails.isSchoolGroup && (
                      <div>
                        <span className="text-gray-600">Schulgruppe:</span>
                        <p className="font-medium">Ja</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Personal Data */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Kontaktdaten</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Name:</span>
                      <p className="font-medium">
                        {selectedBooking.personalData.firstName} {selectedBooking.personalData.lastName}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-600">E-Mail:</span>
                      <p className="font-medium">{selectedBooking.personalData.email}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Telefon:</span>
                      <p className="font-medium">{selectedBooking.personalData.phone}</p>
                    </div>
                  </div>
                </div>

                {/* Special Requests */}
                {selectedBooking.bookingDetails.specialRequests && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Besondere Wünsche</h3>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm text-gray-700">{selectedBooking.bookingDetails.specialRequests}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-4 mt-8">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Schließen
                </button>
                <Link
                  href="/contact"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  onClick={closeModal}
                >
                  Kontakt aufnehmen
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
