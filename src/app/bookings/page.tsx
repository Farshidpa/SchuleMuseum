'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

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

export default function UserBookings() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [userBookings, setUserBookings] = useState<Booking[]>([])
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [sortBy, setSortBy] = useState<'date' | 'created' | 'price'>('created')
  const [filterBy, setFilterBy] = useState<'all' | 'upcoming' | 'past'>('all')

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
      router.push('/login?redirect=/bookings')
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

  const sortedAndFilteredBookings = userBookings
    .filter(booking => {
      if (filterBy === 'all') return true
      if (filterBy === 'upcoming') {
        const bookingDate = new Date(booking.bookingDetails.date)
        return bookingDate > new Date()
      }
      if (filterBy === 'past') {
        const bookingDate = new Date(booking.bookingDetails.date)
        return bookingDate < new Date()
      }
      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.bookingDetails.date).getTime() - new Date(a.bookingDetails.date).getTime()
        case 'created':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case 'price':
          return b.bookingDetails.totalPrice - a.bookingDetails.totalPrice
        default:
          return 0
      }
    })

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
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Meine Buchungen</h1>
                <p className="text-gray-600">Übersicht über alle Ihre Buchungen</p>
              </div>
            </div>
            
            <Link
              href="/events"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Neue Buchung</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Filters and Sorting */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Filter
                </label>
                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value as 'all' | 'upcoming' | 'past')}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">Alle Buchungen</option>
                  <option value="upcoming">Kommende</option>
                  <option value="past">Vergangene</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sortieren nach
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'date' | 'created' | 'price')}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="created">Erstellungsdatum</option>
                  <option value="date">Veranstaltungsdatum</option>
                  <option value="price">Preis</option>
                </select>
              </div>
            </div>
            
            <div className="text-sm text-gray-600">
              {sortedAndFilteredBookings.length} von {userBookings.length} Buchungen
            </div>
          </div>
        </div>

        {/* Bookings List */}
        {sortedAndFilteredBookings.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4m-8 4h16a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {filterBy === 'all' ? 'Noch keine Buchungen' : 
               filterBy === 'upcoming' ? 'Keine kommenden Buchungen' : 
               'Keine vergangenen Buchungen'}
            </h3>
            <p className="text-gray-600 mb-6">
              {filterBy === 'all' ? 'Entdecken Sie unsere Ausstellungen und Veranstaltungen!' :
               filterBy === 'upcoming' ? 'Buchen Sie eine neue Veranstaltung!' :
               'Ihre vergangenen Buchungen werden hier angezeigt.'}
            </p>
            {filterBy !== 'past' && (
              <Link
                href="/events"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Jetzt buchen
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {sortedAndFilteredBookings.map((booking) => {
              const bookingDate = new Date(booking.bookingDetails.date)
              const isPast = bookingDate < new Date()
              
              return (
                <div 
                  key={booking.id} 
                  className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow ${
                    isPast ? 'opacity-75' : ''
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">
                          {booking.bookingDetails.eventType}
                        </h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          isPast 
                            ? 'bg-gray-100 text-gray-600' 
                            : 'bg-green-100 text-green-600'
                        }`}>
                          {isPast ? 'Abgeschlossen' : 'Geplant'}
                        </span>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4m-8 4h16a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2z" />
                          </svg>
                          <span>Buchung: {formatDate(booking.createdAt)}</span>
                        </div>
                        
                        {booking.bookingDetails.date && (
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{booking.bookingDetails.date} um {booking.bookingDetails.time}</span>
                          </div>
                        )}
                        
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span>
                              {booking.bookingDetails.isGroupBooking 
                                ? `${booking.bookingDetails.groupSize} Personen (Gruppe)`
                                : `${booking.bookingDetails.numberOfParticipants} Personen`
                              }
                            </span>
                          </div>
                      </div>
                      
                      {booking.bookingDetails.specialRequests && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Besondere Wünsche:</span> {booking.bookingDetails.specialRequests}
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end space-y-2 sm:space-y-0 sm:space-x-4 lg:space-x-0 lg:space-y-2">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">
                          {formatPrice(booking.bookingDetails.totalPrice)}
                        </p>
                        <p className="text-sm text-gray-500">Gesamtpreis</p>
                      </div>
                      
                      <button
                        onClick={() => openBookingDetails(booking)}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold min-w-[140px]"
                      >
                        Details ansehen
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
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
                      <p className="font-medium break-all">{selectedBooking.id}</p>
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
                      <p className="font-medium break-all">{selectedBooking.personalData.email}</p>
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
