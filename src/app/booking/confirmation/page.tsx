'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function BookingConfirmationPage() {
  const searchParams = useSearchParams()
  const bookingId = searchParams?.get('bookingId')

  // Mock booking data (in real app, fetch from API using bookingId)
  const booking = {
    id: bookingId || 'B1640123456',
    status: 'confirmed',
    eventTitle: 'Führung: Schulzeit in Ernsthausen',
    date: '2024-08-30',
    time: '14:00',
    duration: 90,
    participants: 2,
    totalPrice: 24.00,
    customer: {
      firstName: 'Max',
      lastName: 'Mustermann',
      email: 'max.mustermann@email.de',
      phone: '0123 456789'
    },
    bookingDate: new Date().toISOString(),
    paymentStatus: 'pending',
    cancellationDeadline: '2024-08-29T14:00:00Z'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      weekday: 'long',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Buchung erfolgreich!
          </h1>
          <p className="text-xl text-gray-600">
            Ihre Buchung wurde bestätigt. Sie erhalten in Kürze eine Bestätigungs-E-Mail.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Booking Details */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 bg-green-50 border-b border-green-200">
              <h2 className="text-xl font-bold text-gray-900">Buchungsdetails</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <span className="text-gray-600">Buchungsnummer:</span>
                <span className="font-mono font-semibold text-gray-900">{booking.id}</span>
              </div>
              
              <div className="flex justify-between items-start">
                <span className="text-gray-600">Status:</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Bestätigt
                </span>
              </div>

              <div className="flex justify-between items-start">
                <span className="text-gray-600">Veranstaltung:</span>
                <span className="font-medium text-gray-900 text-right">{booking.eventTitle}</span>
              </div>

              <div className="flex justify-between items-start">
                <span className="text-gray-600">Datum:</span>
                <span className="font-medium text-gray-900">{formatDate(booking.date)}</span>
              </div>

              <div className="flex justify-between items-start">
                <span className="text-gray-600">Uhrzeit:</span>
                <span className="font-medium text-gray-900">{booking.time} Uhr</span>
              </div>

              <div className="flex justify-between items-start">
                <span className="text-gray-600">Dauer:</span>
                <span className="font-medium text-gray-900">{booking.duration} Minuten</span>
              </div>

              <div className="flex justify-between items-start">
                <span className="text-gray-600">Teilnehmer:</span>
                <span className="font-medium text-gray-900">{booking.participants} Personen</span>
              </div>

              <div className="flex justify-between items-start pt-4 border-t border-gray-200">
                <span className="text-gray-600 font-medium">Gesamtpreis:</span>
                <span className="text-2xl font-bold text-green-600">{booking.totalPrice.toFixed(2)}€</span>
              </div>

              <div className="flex justify-between items-start">
                <span className="text-gray-600">Zahlungsstatus:</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Ausstehend
                </span>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 bg-blue-50 border-b border-blue-200">
              <h2 className="text-xl font-bold text-gray-900">Kontaktdaten</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <span className="text-gray-600">Name:</span>
                <span className="font-medium text-gray-900">
                  {booking.customer.firstName} {booking.customer.lastName}
                </span>
              </div>

              <div className="flex justify-between items-start">
                <span className="text-gray-600">E-Mail:</span>
                <span className="font-medium text-gray-900">{booking.customer.email}</span>
              </div>

              <div className="flex justify-between items-start">
                <span className="text-gray-600">Telefon:</span>
                <span className="font-medium text-gray-900">{booking.customer.phone}</span>
              </div>

              <div className="flex justify-between items-start">
                <span className="text-gray-600">Gebucht am:</span>
                <span className="font-medium text-gray-900">{formatDateTime(booking.bookingDate)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Important Information */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Wichtige Informationen</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-yellow-50 rounded-lg p-4">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-yellow-600 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="font-semibold text-yellow-800 mb-2">Stornierung</h3>
                  <p className="text-sm text-yellow-700">
                    Kostenlose Stornierung bis zum {formatDate(booking.cancellationDeadline)} um {booking.time} Uhr möglich.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-blue-600 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <h3 className="font-semibold text-blue-800 mb-2">Treffpunkt</h3>
                  <p className="text-sm text-blue-700">
                    Empfang im Hauptgebäude, Schulstraße 15, 36287 Ernsthausen. 
                    Bitte erscheinen Sie 10 Minuten vor Beginn.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-green-600 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <h3 className="font-semibold text-green-800 mb-2">Kontakt</h3>
                  <p className="text-sm text-green-700">
                    Bei Fragen erreichen Sie uns unter 06642 / 91 91 91 oder 
                    info@schulemuseum.de
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-purple-600 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
                <div>
                  <h3 className="font-semibold text-purple-800 mb-2">Zahlung</h3>
                  <p className="text-sm text-purple-700">
                    Zahlung vor Ort in bar oder per EC-Karte möglich. 
                    Rechnung erhalten Sie per E-Mail.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.print()}
            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-semibold flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Buchung drucken
          </button>
          
          <Link
            href="/events"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-center"
          >
            Weitere Veranstaltungen
          </Link>
          
          <Link
            href="/"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold text-center"
          >
            Zur Startseite
          </Link>
        </div>

        {/* Support Information */}
        <div className="mt-12 text-center bg-gray-100 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Benötigen Sie Hilfe?
          </h3>
          <p className="text-gray-600 mb-4">
            Unser Team steht Ihnen gerne zur Verfügung
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+496642919191"
              className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-white transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              06642 / 91 91 91
            </a>
            <a
              href="mailto:info@schulemuseum.de"
              className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-white transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              E-Mail senden
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-white transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Kontaktformular
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
