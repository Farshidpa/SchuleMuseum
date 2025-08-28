'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

export default function BookingPage() {
  const searchParams = useSearchParams()
  const eventId = searchParams?.get('eventId')
  const bookingType = searchParams?.get('type') // 'group' or regular
  const { user, isLoading } = useAuth()

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      const currentUrl = window.location.pathname + window.location.search
      window.location.href = `/login?redirect=${encodeURIComponent(currentUrl)}&message=booking`
    }
  }, [user, isLoading])

  const [event, setEvent] = useState<any>(null)
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Booking Details
    numberOfParticipants: 1,
    specialRequests: '',
    
    // Group Booking Specific
    organizationName: '',
    isSchoolGroup: false,
    ageGroup: '',
    preferredDate: '',
    preferredTime: '',
    groupSize: 1,
    
    // Agreement
    acceptTerms: false,
    acceptCancellation: false
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step, setStep] = useState(1)

  // Mock event data (in real app, fetch from API)
  const events = useMemo(() => [
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
      eventType: "GUIDED_TOUR"
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
      eventType: "WORKSHOP"
    }
  ], [])

  useEffect(() => {
    if (eventId) {
      const foundEvent = events.find((e: any) => e.id === parseInt(eventId))
      setEvent(foundEvent)
    }
  }, [eventId, events])

  // Pre-fill form data when user is logged in
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || ''
      }))
    }
  }, [user])

  const isGroupBooking = bookingType === 'group'
  const availableSpots = event ? event.maxParticipants - event.currentParticipants : 0

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Vorname ist erforderlich'
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Nachname ist erforderlich'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'E-Mail ist erforderlich'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Ungültige E-Mail-Adresse'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefonnummer ist erforderlich'
    }

    if (isGroupBooking) {
      if (!formData.organizationName.trim()) {
        newErrors.organizationName = 'Name der Organisation ist erforderlich'
      }
      if (!formData.preferredDate) {
        newErrors.preferredDate = 'Wunschtermin ist erforderlich'
      }
      if (formData.groupSize < 1) {
        newErrors.groupSize = 'Gruppengröße muss mindestens 1 sein'
      }
    } else {
      if (formData.numberOfParticipants < 1) {
        newErrors.numberOfParticipants = 'Teilnehmerzahl muss mindestens 1 sein'
      }
      if (formData.numberOfParticipants > availableSpots) {
        newErrors.numberOfParticipants = `Nur noch ${availableSpots} Plätze verfügbar`
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Sie müssen den Buchungsbedingungen zustimmen'
    }
    if (!formData.acceptCancellation) {
      newErrors.acceptCancellation = 'Sie müssen die Stornobedingungen akzeptieren'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseInt(value) || 0 : value
    }))
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateStep2()) {
      return
    }

    setIsSubmitting(true)
    
    try {
      // Store booking in localStorage
      const bookings = JSON.parse(localStorage.getItem('museum_bookings') || '[]')
      
      const newBooking = {
        id: 'B' + Date.now(),
        personalData: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone
        },
        bookingDetails: {
          eventType: isGroupBooking ? 'Gruppenbesuch' : event?.title,
          date: formData.preferredDate,
          time: formData.preferredTime,
          numberOfParticipants: formData.numberOfParticipants,
          groupSize: formData.groupSize,
          isGroupBooking,
          isSchoolGroup: formData.isSchoolGroup,
          specialRequests: formData.specialRequests,
          totalPrice: getTotalPrice()
        },
        createdAt: new Date().toISOString()
      }
      
      bookings.push(newBooking)
      localStorage.setItem('museum_bookings', JSON.stringify(bookings))
      
      console.log('Booking created:', newBooking.id)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Redirect to confirmation page
      window.location.href = `/booking/confirmation?bookingId=${newBooking.id}`
    } catch (error) {
      console.error('Booking error:', error)
      setErrors({ submit: 'Buchung fehlgeschlagen. Bitte versuchen Sie es erneut.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getTotalPrice = () => {
    if (isGroupBooking) {
      return formData.groupSize * (formData.isSchoolGroup ? 8.00 : 12.00)
    }
    return event ? formData.numberOfParticipants * event.price : 0
  }

  // Show loading state while checking authentication
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

  // Show authentication required message
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Anmeldung erforderlich
          </h1>
          <p className="text-gray-600 mb-6">
            Um eine Buchung vorzunehmen, müssen Sie sich zuerst registrieren und anmelden.
          </p>
          <div className="space-y-3">
            <Link
              href="/register"
              className="block w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Jetzt registrieren
            </Link>
            <Link
              href="/login"
              className="block w-full border border-blue-600 text-blue-600 py-3 px-4 rounded-lg hover:bg-blue-50 transition-colors font-medium"
            >
              Bereits registriert? Anmelden
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (eventId && !event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Veranstaltung nicht gefunden</h1>
          <Link href="/events" className="text-blue-600 hover:underline">
            Zurück zu den Veranstaltungen
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="px-8 py-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <h1 className="text-3xl font-bold">
              {isGroupBooking ? 'Gruppenbesuch buchen' : 'Veranstaltung buchen'}
            </h1>
            <p className="mt-2 text-blue-100">
              {isGroupBooking 
                ? 'Buchen Sie einen individuellen Besuch für Ihre Gruppe'
                : event?.title
              }
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="px-8 py-4 bg-gray-50 border-b">
            <div className="flex items-center">
              <div className={`flex items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  1
                </div>
                <span className="ml-2 font-medium">Persönliche Daten</span>
              </div>
              <div className="flex-1 h-1 mx-4 bg-gray-200">
                <div className={`h-1 transition-all duration-300 ${step >= 2 ? 'bg-blue-600 w-full' : 'bg-blue-600 w-0'}`}></div>
              </div>
              <div className={`flex items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  2
                </div>
                <span className="ml-2 font-medium">Bestätigung</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <form onSubmit={step === 1 ? (e) => { e.preventDefault(); handleNext(); } : handleSubmit}>
                {errors.submit && (
                  <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {errors.submit}
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-gray-900">Persönliche Daten</h2>
                      {user && (
                        <div className="flex items-center text-green-600 text-sm">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Angemeldet als {user.email}
                        </div>
                      )}
                    </div>

                    {/* Personal Information */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                          Vorname *
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          readOnly={!!user}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500 ${
                            user ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                          } ${
                            errors.firstName ? 'border-red-300' : 'border-gray-300'
                          }`}
                        />
                        {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
                      </div>

                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                          Nachname *
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          readOnly={!!user}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500 ${
                            user ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                          } ${
                            errors.lastName ? 'border-red-300' : 'border-gray-300'
                          }`}
                        />
                        {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        E-Mail-Adresse *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500 ${
                          errors.email ? 'border-red-300' : 'border-gray-300'
                        }`}
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Telefonnummer *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500 ${
                          errors.phone ? 'border-red-300' : 'border-gray-300'
                        }`}
                      />
                      {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                    </div>

                    {/* Group Booking Fields */}
                    {isGroupBooking && (
                      <>
                        <div>
                          <label htmlFor="organizationName" className="block text-sm font-medium text-gray-700 mb-2">
                            Name der Organisation/Schule *
                          </label>
                          <input
                            type="text"
                            id="organizationName"
                            name="organizationName"
                            value={formData.organizationName}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500 ${
                              errors.organizationName ? 'border-red-300' : 'border-gray-300'
                            }`}
                          />
                          {errors.organizationName && <p className="mt-1 text-sm text-red-600">{errors.organizationName}</p>}
                        </div>

                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="isSchoolGroup"
                            name="isSchoolGroup"
                            checked={formData.isSchoolGroup}
                            onChange={handleChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label htmlFor="isSchoolGroup" className="ml-3 text-sm text-gray-700">
                            Schulgruppe (reduzierter Preis: 8€ statt 12€ pro Person)
                          </label>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="groupSize" className="block text-sm font-medium text-gray-700 mb-2">
                              Gruppengröße *
                            </label>
                            <input
                              type="number"
                              id="groupSize"
                              name="groupSize"
                              min="1"
                              max="50"
                              value={formData.groupSize}
                              onChange={handleChange}
                              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500 ${
                                errors.groupSize ? 'border-red-300' : 'border-gray-300'
                              }`}
                            />
                            {errors.groupSize && <p className="mt-1 text-sm text-red-600">{errors.groupSize}</p>}
                          </div>

                          <div>
                            <label htmlFor="ageGroup" className="block text-sm font-medium text-gray-700 mb-2">
                              Altersgruppe
                            </label>
                            <select
                              id="ageGroup"
                              name="ageGroup"
                              value={formData.ageGroup}
                              onChange={handleChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                            >
                              <option value="">Bitte wählen</option>
                              <option value="kindergarten">Kindergarten (3-6 Jahre)</option>
                              <option value="grundschule">Grundschule (6-10 Jahre)</option>
                              <option value="secondary">Weiterführende Schule (10-18 Jahre)</option>
                              <option value="adult">Erwachsene (18+ Jahre)</option>
                              <option value="senior">Senioren (65+ Jahre)</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-2">
                              Wunschtermin *
                            </label>
                            <input
                              type="date"
                              id="preferredDate"
                              name="preferredDate"
                              value={formData.preferredDate}
                              onChange={handleChange}
                              min={new Date().toISOString().split('T')[0]}
                              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 ${
                                errors.preferredDate ? 'border-red-300' : 'border-gray-300'
                              }`}
                            />
                            {errors.preferredDate && <p className="mt-1 text-sm text-red-600">{errors.preferredDate}</p>}
                          </div>

                          <div>
                            <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700 mb-2">
                              Wunschzeit
                            </label>
                            <select
                              id="preferredTime"
                              name="preferredTime"
                              value={formData.preferredTime}
                              onChange={handleChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                            >
                              <option value="">Bitte wählen</option>
                              <option value="09:00">09:00 Uhr</option>
                              <option value="10:00">10:00 Uhr</option>
                              <option value="11:00">11:00 Uhr</option>
                              <option value="14:00">14:00 Uhr</option>
                              <option value="15:00">15:00 Uhr</option>
                              <option value="16:00">16:00 Uhr</option>
                            </select>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Regular Booking Fields */}
                    {!isGroupBooking && (
                      <div>
                        <label htmlFor="numberOfParticipants" className="block text-sm font-medium text-gray-700 mb-2">
                          Anzahl Teilnehmer *
                        </label>
                        <input
                          type="number"
                          id="numberOfParticipants"
                          name="numberOfParticipants"
                          min="1"
                          max={availableSpots}
                          value={formData.numberOfParticipants}
                          onChange={handleChange}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500 ${
                            errors.numberOfParticipants ? 'border-red-300' : 'border-gray-300'
                          }`}
                        />
                        {errors.numberOfParticipants && <p className="mt-1 text-sm text-red-600">{errors.numberOfParticipants}</p>}
                        <p className="mt-1 text-sm text-gray-500">
                          Noch {availableSpots} Plätze verfügbar
                        </p>
                      </div>
                    )}

                    <div>
                      <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-2">
                        Besondere Wünsche oder Anmerkungen
                      </label>
                      <textarea
                        id="specialRequests"
                        name="specialRequests"
                        rows={4}
                        value={formData.specialRequests}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                        placeholder="Barrierefreiheit, Allergien, spezielle Interessen..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                      Weiter zur Bestätigung
                    </button>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Buchung bestätigen</h2>

                    {/* Booking Summary */}
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Zusammenfassung</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Name:</span>
                          <span>{formData.firstName} {formData.lastName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>E-Mail:</span>
                          <span>{formData.email}</span>
                        </div>
                        {isGroupBooking ? (
                          <>
                            <div className="flex justify-between">
                              <span>Organisation:</span>
                              <span>{formData.organizationName}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Gruppengröße:</span>
                              <span>{formData.groupSize} Personen</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Wunschtermin:</span>
                              <span>
                                {formData.preferredDate ? new Date(formData.preferredDate).toLocaleDateString('de-DE') : 'Nach Absprache'}
                                {formData.preferredTime && ` um ${formData.preferredTime}`}
                              </span>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex justify-between">
                              <span>Veranstaltung:</span>
                              <span>{event?.title}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Termin:</span>
                              <span>
                                {event && new Date(event.date).toLocaleDateString('de-DE')} um {event?.time}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Teilnehmer:</span>
                              <span>{formData.numberOfParticipants} Personen</span>
                            </div>
                          </>
                        )}
                        <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                          <span>Gesamtpreis:</span>
                          <span>{getTotalPrice().toFixed(2)}€</span>
                        </div>
                      </div>
                    </div>

                    {/* Terms and Conditions */}
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          id="acceptTerms"
                          name="acceptTerms"
                          checked={formData.acceptTerms}
                          onChange={handleChange}
                          className={`mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ${
                            errors.acceptTerms ? 'border-red-300' : ''
                          }`}
                        />
                        <label htmlFor="acceptTerms" className="ml-3 text-sm text-gray-700">
                          Ich akzeptiere die{' '}
                          <Link href="/terms" className="text-blue-600 hover:underline">
                            Allgemeinen Geschäftsbedingungen
                          </Link>
                          *
                        </label>
                      </div>
                      {errors.acceptTerms && (
                        <p className="text-sm text-red-600 ml-7">{errors.acceptTerms}</p>
                      )}

                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          id="acceptCancellation"
                          name="acceptCancellation"
                          checked={formData.acceptCancellation}
                          onChange={handleChange}
                          className={`mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ${
                            errors.acceptCancellation ? 'border-red-300' : ''
                          }`}
                        />
                        <label htmlFor="acceptCancellation" className="ml-3 text-sm text-gray-700">
                          Ich habe die{' '}
                          <Link href="/cancellation" className="text-blue-600 hover:underline">
                            Stornobedingungen
                          </Link>{' '}
                          gelesen und akzeptiert *
                        </label>
                      </div>
                      {errors.acceptCancellation && (
                        <p className="text-sm text-red-600 ml-7">{errors.acceptCancellation}</p>
                      )}
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                      >
                        Zurück
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`flex-1 py-3 px-6 rounded-lg font-semibold text-white transition-colors ${
                          isSubmitting
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-green-600 hover:bg-green-700'
                        }`}
                      >
                        {isSubmitting ? 'Buchung wird verarbeitet...' : 'Jetzt buchen'}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              {!isGroupBooking && event && (
                <>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Veranstaltungsdetails</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-gray-500">Titel:</span>
                      <div className="font-medium">{event.title}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Datum:</span>
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
                      <span className="text-gray-500">Uhrzeit:</span>
                      <div className="font-medium">{event.time} Uhr</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Dauer:</span>
                      <div className="font-medium">{event.duration} Minuten</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Preis pro Person:</span>
                      <div className="font-medium text-blue-600">{event.price.toFixed(2)}€</div>
                    </div>
                  </div>
                </>
              )}

              {isGroupBooking && (
                <>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Gruppenbesuch</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-gray-500">Regelpreis:</span>
                      <div className="font-medium">12,00€ pro Person</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Schulgruppen:</span>
                      <div className="font-medium text-green-600">8,00€ pro Person</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Mindestgröße:</span>
                      <div className="font-medium">10 Personen</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Maximale Größe:</span>
                      <div className="font-medium">30 Personen</div>
                    </div>
                  </div>
                </>
              )}

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2">Kontakt</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <div>📞 06642 / 91 91 91</div>
                  <div>✉️ info@schulemuseum.de</div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2">Stornierung</h4>
                <p className="text-sm text-gray-600">
                  Kostenlose Stornierung bis 24 Stunden vor dem Termin.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
