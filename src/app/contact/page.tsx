'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    visitPurpose: '',
    preferredContact: 'email'
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateForm = () => {
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
    if (!formData.subject.trim()) {
      newErrors.subject = 'Betreff ist erforderlich'
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Nachricht ist erforderlich'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    
    try {
      // Store message in localStorage
      const messages = JSON.parse(localStorage.getItem('museum_contact_messages') || '[]')
      
      const newMessage = {
        id: 'M' + Date.now(),
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        inquiryType: formData.visitPurpose,
        subject: formData.subject,
        message: formData.message,
        createdAt: new Date().toISOString()
      }
      
      messages.push(newMessage)
      localStorage.setItem('museum_contact_messages', JSON.stringify(messages))
      
      console.log('Contact message stored:', newMessage.id)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setIsSubmitted(true)
    } catch (error) {
      console.error('Contact form error:', error)
      setErrors({ submit: 'Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Nachricht gesendet!
          </h1>
          <p className="text-gray-600 mb-6">
            Vielen Dank für Ihre Nachricht. Wir werden uns schnellstmöglich bei Ihnen melden.
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false)
              setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                subject: '',
                message: '',
                visitPurpose: '',
                preferredContact: 'email'
              })
            }}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Neue Nachricht senden
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-800 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Kontakt
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              Wir freuen uns auf Ihre Nachricht und helfen Ihnen gerne weiter
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              So erreichen Sie uns
            </h2>

            <div className="space-y-8">
              {/* Address */}
              <div className="flex items-start">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Adresse</h3>
                  <p className="text-gray-600">
                    Schulmuseum Ernsthausen<br />
                    Schulstraße 15<br />
                    36287 Ernsthausen<br />
                    Deutschland
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Telefon</h3>
                  <p className="text-gray-600">
                    <a href="tel:+496642919191" className="hover:text-blue-600 transition-colors">
                      06642 / 91 91 91
                    </a>
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Mo-Fr: 9:00-17:00 Uhr
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">E-Mail</h3>
                  <p className="text-gray-600">
                    <a href="mailto:info@Schulmuseum.de" className="hover:text-blue-600 transition-colors">
                      info@Schulmuseum.de
                    </a>
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Antwort binnen 24 Stunden
                  </p>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="flex items-start">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Öffnungszeiten</h3>
                  <div className="text-gray-600 space-y-1">
                    <div className="flex justify-between">
                      <span>Dienstag - Freitag:</span>
                      <span>10:00 - 16:00 Uhr</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Samstag - Sonntag:</span>
                      <span>11:00 - 17:00 Uhr</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Montag:</span>
                      <span>Geschlossen</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Options */}
            <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Schnellkontakt</h3>
              <div className="space-y-3">
                <a
                  href="tel:+496642919191"
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>Anrufen</span>
                  </div>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>

                <a
                  href="mailto:info@Schulmuseum.de"
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>E-Mail senden</span>
                  </div>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Nachricht senden
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {errors.submit && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {errors.submit}
                  </div>
                )}

                {/* Name Fields */}
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
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500 ${
                        errors.firstName ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                    )}
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
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500 ${
                        errors.lastName ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-2 gap-4">
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
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Telefonnummer (optional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                    />
                  </div>
                </div>

                {/* Visit Purpose */}
                <div>
                  <label htmlFor="visitPurpose" className="block text-sm font-medium text-gray-700 mb-2">
                    Anliegen
                  </label>
                  <select
                    id="visitPurpose"
                    name="visitPurpose"
                    value={formData.visitPurpose}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  >
                    <option value="">Bitte wählen</option>
                    <option value="general">Allgemeine Anfrage</option>
                    <option value="booking">Buchungsanfrage</option>
                    <option value="group">Gruppenbesuch</option>
                    <option value="education">Bildungsprogramm</option>
                    <option value="press">Presse & Medien</option>
                    <option value="cooperation">Kooperation</option>
                    <option value="feedback">Feedback & Beschwerden</option>
                    <option value="other">Sonstiges</option>
                  </select>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Betreff *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500 ${
                      errors.subject ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Worum geht es?"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Nachricht *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500 ${
                      errors.message ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Ihre Nachricht an uns..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                  )}
                </div>

                {/* Preferred Contact Method */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bevorzugte Kontaktart
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="email"
                        checked={formData.preferredContact === 'email'}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">E-Mail</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="phone"
                        checked={formData.preferredContact === 'phone'}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">Telefon</span>
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {isSubmitting ? 'Nachricht wird gesendet...' : 'Nachricht senden'}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  Ihre Daten werden vertraulich behandelt und nicht an Dritte weitergegeben. 
                  Weitere Informationen finden Sie in unserer Datenschutzerklärung.
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            So finden Sie uns
          </h2>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="h-96 bg-gray-200 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <p className="text-lg font-medium">Interaktive Karte</p>
                <p className="text-sm">Schulstraße 15, 36287 Ernsthausen</p>
              </div>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">🚗 Mit dem Auto</h3>
                  <p className="text-sm text-gray-600">
                    Kostenlose Parkplätze direkt vor dem Museum verfügbar
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">🚌 Öffentliche Verkehrsmittel</h3>
                  <p className="text-sm text-gray-600">
                    Bushaltestelle &ldquo;Schule&rdquo; - 2 Minuten Fußweg
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">♿ Barrierefreiheit</h3>
                  <p className="text-sm text-gray-600">
                    Das Museum ist vollständig barrierefrei zugänglich
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
