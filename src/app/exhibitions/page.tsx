'use client'

import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'

export default function ExhibitionsPage() {
  const { user } = useAuth()

  const handleBookingClick = (exhibitionId: number, type: string = 'tour') => {
    if (!user) {
      const bookingUrl = type === 'group' 
        ? `/booking?type=group&exhibition=${exhibitionId}`
        : `/events?exhibition=${exhibitionId}`
      window.location.href = `/login?redirect=${encodeURIComponent(bookingUrl)}&message=booking`
      return
    }
    
    if (type === 'group') {
      window.location.href = `/booking?type=group&exhibition=${exhibitionId}`
    } else {
      window.location.href = `/events?exhibition=${exhibitionId}`
    }
  }
  const exhibitions = [
    {
      id: 1,
      title: "Schulzeit in Ernsthausen - 1900 bis 2000",
      description: "Eine faszinierende Reise durch 100 Jahre Bildungsgeschichte mit historischen Schulbüchern, Klassenzimmer-Ausstattung und Geschichten von Schülern und Lehrern.",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      image: "/images/schulzeit-exhibition.jpg",
      status: "Aktuelle Sonderausstellung",
      price: "8€",
      highlights: ["Historische Schulbücher", "Originales Klassenzimmer", "Interaktive Stationen"]
    },
    {
      id: 2,
      title: "Kriegszeit und Wiederaufbau 1939-1960",
      description: "Eine bewegende Ausstellung über die schweren Jahre des Zweiten Weltkriegs und den mutigen Wiederaufbau der Gemeinde Ernsthausen.",
      startDate: "2025-03-01",
      endDate: "2025-10-31",
      image: "/images/war-reconstruction.jpg",
      status: "Kommende Sonderausstellung",
      price: "10€",
      highlights: ["Zeitzeugenberichte", "Originaldokumente", "Fotografien vom Wiederaufbau"]
    },
    {
      id: 3,
      title: "Landwirtschaft im Wandel",
      description: "Von der traditionellen Landwirtschaft zur modernen Technologie - erleben Sie 150 Jahre landwirtschaftlichen Fortschritt in Ernsthausen.",
      startDate: "2025-06-01",
      endDate: "2025-12-31",
      image: "/images/agriculture-change.jpg",
      status: "Kommende Sonderausstellung",
      price: "9€",
      highlights: ["Historische Geräte", "Moderne Technik", "Generationengespräche"]
    },
    {
      id: 4,
      title: "Dorfgeschichte Ernsthausen",
      description: "Entdecken Sie die Entwicklung unseres Ortes von seinen Anfängen bis heute. Mit Fotografien, Dokumenten und Geschichten der Einwohner.",
      startDate: "2023-06-01",
      endDate: null,
      image: "/images/village-history.jpg",
      status: "Dauerausstellung",
      price: "6€",
      highlights: ["Historische Fotografien", "Dorfchronik", "Zeitzeugenberichte"]
    },
    {
      id: 5,
      title: "Handwerk und Gewerbe",
      description: "Traditionelle Handwerkskunst und die Entwicklung des Gewerbes in der Region. Mit funktionsfähigen Werkstätten und Demonstrationen.",
      startDate: "2023-03-15",
      endDate: null,
      image: "/images/crafts-exhibition.jpg",
      status: "Dauerausstellung",
      price: "6€",
      highlights: ["Funktionsfähige Werkstätten", "Live-Demonstrationen", "Mitmach-Stationen"]
    },
    {
      id: 6,
      title: "Traditionen und Feste",
      description: "Erleben Sie die reiche Tradition der Dorfgemeinschaft mit historischen Kostümen, Festbräuchen und regionalen Besonderheiten.",
      startDate: "2022-01-01",
      endDate: null,
      image: "/images/traditions-festivals.jpg",
      status: "Dauerausstellung",
      price: "5€",
      highlights: ["Historische Kostüme", "Festbräuche", "Interaktive Mitmachangebote"]
    },
    {
      id: 7,
      title: "Natur und Umwelt",
      description: "Die einzigartige Flora und Fauna rund um Ernsthausen. Von heimischen Tieren bis zu seltenen Pflanzenarten.",
      startDate: "2022-05-01",
      endDate: null,
      image: "/images/nature-environment.jpg",
      status: "Dauerausstellung",
      price: "7€",
      highlights: ["Heimische Tierwelt", "Botanischer Garten", "Umweltbildung"]
    },
    {
      id: 8,
      title: "Archäologie und Vorgeschichte",
      description: "Funde aus der Steinzeit bis zum Mittelalter zeigen die lange Besiedlungsgeschichte der Region Ernsthausen.",
      startDate: "2021-01-01",
      endDate: null,
      image: "/images/archaeology.jpg",
      status: "Dauerausstellung",
      price: "8€",
      highlights: ["Steinzeitfunde", "Mittelalterliche Artefakte", "Ausgrabungsberichte"]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-800 to-orange-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Unsere Ausstellungen
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              Tauchen Sie ein in die Geschichte von Ernsthausen und erleben Sie 
              faszinierende Exponate aus verschiedenen Epochen
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <button className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors">
                Alle
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                Sonderausstellungen
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                Dauerausstellungen
              </button>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-sm font-medium text-gray-700">
                Sortieren:
              </label>
              <select 
                id="sort"
                className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option>Neueste zuerst</option>
                <option>Alphabetisch</option>
                <option>Nach Datum</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Exhibitions Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {exhibitions.map((exhibition) => (
              <div key={exhibition.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                {/* Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-amber-100 to-orange-200 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-amber-200 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg className="w-8 h-8 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <p className="text-amber-700 text-sm font-medium">Ausstellungsbild</p>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      exhibition.status === 'Aktuelle Sonderausstellung' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {exhibition.status}
                    </span>
                    <span className="text-lg font-bold text-amber-600">{exhibition.price}</span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {exhibition.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {exhibition.description}
                  </p>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Highlights:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {exhibition.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-center">
                          <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-2">
                    <Link 
                      href={`/exhibitions/${exhibition.id}`}
                      className="flex-1 bg-amber-600 text-white text-center py-2 px-4 rounded-lg hover:bg-amber-700 transition-colors font-medium"
                    >
                      Details ansehen
                    </Link>
                    <button 
                      onClick={() => handleBookingClick(exhibition.id, 'tour')}
                      className="flex-1 border border-amber-600 text-amber-600 text-center py-2 px-4 rounded-lg hover:bg-amber-50 transition-colors font-medium"
                    >
                      {user ? 'Führung buchen' : 'Anmelden & Führung buchen'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-amber-50 py-12">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Interessiert an einer Führung?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Erleben Sie unsere Ausstellungen mit einem erfahrenen Guide. 
            Buchen Sie eine individuelle oder Gruppenführung.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => handleBookingClick(0, 'tour')}
              className="bg-amber-600 text-white px-8 py-3 rounded-lg hover:bg-amber-700 transition-colors font-semibold"
            >
              {user ? 'Führung buchen' : 'Anmelden & Führung buchen'}
            </button>
            <button
              onClick={() => handleBookingClick(0, 'group')}
              className="border border-amber-600 text-amber-600 px-8 py-3 rounded-lg hover:bg-amber-50 transition-colors font-semibold"
            >
              {user ? 'Gruppenbesuch planen' : 'Anmelden & Gruppenbesuch planen'}
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
