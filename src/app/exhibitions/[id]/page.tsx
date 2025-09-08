'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

export default function ExhibitionDetailPage() {
  const params = useParams()
  const exhibitionId = parseInt(params.id as string)
  const [activeTab, setActiveTab] = useState('overview')
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
      fullDescription: "Tauchen Sie ein in die Geschichte der Bildung in Ernsthausen! Diese umfassende Ausstellung führt Sie durch ein Jahrhundert des Lernens und Lehrens in unserem Dorf. Von den strengen Klassenzimmern der frühen 1900er Jahre bis zu den modernen Unterrichtsmethoden der Jahrtausendwende - erleben Sie, wie sich die Bildung gewandelt hat.\n\nBesichtigen Sie ein originalgetreu nachgebautes Klassenzimmer aus den 1920er Jahren, komplett mit Holzbänken, Schiefertafeln und dem berühmten Rohrstock. Entdecken Sie seltene Schulbücher, historische Schreibutensilien und erfahren Sie Geschichten von ehemaligen Schülern und Lehrern, die das Bildungswesen geprägt haben.\n\nInteraktive Stationen laden dazu ein, alte Schreibtechniken auszuprobieren und sich in die Rolle eines Schülers von damals zu versetzen.",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      image: "/images/schulzeit-exhibition.jpg",
      status: "Aktuelle Sonderausstellung",
      price: "8€",
      highlights: ["Historische Schulbücher", "Originales Klassenzimmer", "Interaktive Stationen"],
      details: {
        duration: "90 Minuten",
        rooms: 3,
        artifacts: 150,
        interactiveStations: 8,
        audioGuide: true,
        wheelchairAccessible: true,
        parking: "Kostenlos vor dem Museum",
        openingHours: "Di-So: 10:00-17:00",
        lastEntry: "16:00"
      },
      gallery: [
        "/images/classroom-1920.jpg",
        "/images/old-schoolbooks.jpg",
        "/images/writing-tools.jpg",
        "/images/teacher-desk.jpg"
      ]
    },
    {
      id: 2,
      title: "Kriegszeit und Wiederaufbau 1939-1960",
      description: "Eine bewegende Ausstellung über die schweren Jahre des Zweiten Weltkriegs und den mutigen Wiederaufbau der Gemeinde Ernsthausen.",
      fullDescription: "Diese emotionale Ausstellung dokumentiert eine der schwierigsten Perioden in der Geschichte von Ernsthausen. Durch persönliche Berichte, Originalfotografien und historische Dokumente erleben Besucher die Herausforderungen des Zweiten Weltkriegs und die beeindruckende Kraft des Wiederaufbaus.\n\nErfahren Sie, wie die Dorfgemeinschaft zusammenhielt, als viele Männer im Krieg waren und die Frauen und Kinder das Dorf am Leben erhielten. Sehen Sie Originalrationskarten, Bunkerausrüstung und Briefe von der Front.\n\nDer zweite Teil der Ausstellung zeigt den bemerkenswerten Wiederaufbau: Wie aus Ruinen wieder ein blühendes Dorf wurde, wie neue Hoffnung entstand und wie die Gemeinschaft stärker wurde denn je.",
      startDate: "2025-03-01",
      endDate: "2025-10-31",
      image: "/images/war-reconstruction.jpg",
      status: "Kommende Sonderausstellung",
      price: "10€",
      highlights: ["Zeitzeugenberichte", "Originaldokumente", "Fotografien vom Wiederaufbau"],
      details: {
        duration: "120 Minuten",
        rooms: 4,
        artifacts: 200,
        interactiveStations: 6,
        audioGuide: true,
        wheelchairAccessible: true,
        parking: "Kostenlos vor dem Museum",
        openingHours: "Di-So: 10:00-17:00",
        lastEntry: "15:30"
      },
      gallery: [
        "/images/wartime-documents.jpg",
        "/images/reconstruction-photos.jpg",
        "/images/ration-cards.jpg",
        "/images/family-stories.jpg"
      ]
    },
    {
      id: 3,
      title: "Landwirtschaft im Wandel",
      description: "Von der traditionellen Landwirtschaft zur modernen Technologie - erleben Sie 150 Jahre landwirtschaftlichen Fortschritt in Ernsthausen.",
      fullDescription: "Entdecken Sie die dramatischen Veränderungen in der Landwirtschaft! Diese faszinierende Ausstellung zeigt, wie sich die Landwirtschaft in Ernsthausen von der mühsamen Handarbeit des 19. Jahrhunderts zu den hochmodernen Technologien von heute entwickelt hat.\n\nBestaunen Sie historische Geräte wie Pflüge, Sensen und Dreschflegel und erfahren Sie, wie ein Arbeitstag auf dem Bauernhof vor 150 Jahren aussah. Vergleichen Sie dies mit modernen Maschinen und GPS-gesteuerten Traktoren.\n\nBesonders bewegend sind die Gespräche zwischen verschiedenen Generationen von Landwirten, die ihre Erfahrungen und Geschichten teilen. Interaktive Stationen zeigen den Wandel der Anbaumethoden und die Auswirkungen der Technologie auf die Landwirtschaft.",
      startDate: "2025-06-01",
      endDate: "2025-12-31",
      image: "/images/agriculture-change.jpg",
      status: "Kommende Sonderausstellung",
      price: "9€",
      highlights: ["Historische Geräte", "Moderne Technik", "Generationengespräche"],
      details: {
        duration: "100 Minuten",
        rooms: 3,
        artifacts: 180,
        interactiveStations: 10,
        audioGuide: true,
        wheelchairAccessible: false,
        parking: "Kostenlos vor dem Museum",
        openingHours: "Di-So: 10:00-17:00",
        lastEntry: "16:00"
      },
      gallery: [
        "/images/old-farming-tools.jpg",
        "/images/modern-tractors.jpg",
        "/images/harvest-scenes.jpg",
        "/images/farmer-interviews.jpg"
      ]
    },
    {
      id: 4,
      title: "Dorfgeschichte Ernsthausen",
      description: "Entdecken Sie die Entwicklung unseres Ortes von seinen Anfängen bis heute. Mit Fotografien, Dokumenten und Geschichten der Einwohner.",
      fullDescription: "Eine umfassende Chronik des Dorfes Ernsthausen von den ersten urkundlichen Erwähnungen bis zur Gegenwart. Diese Dauerausstellung ist das Herzstück unseres Museums und zeigt die reiche Geschichte unserer Gemeinde.\n\nBeginnen Sie Ihre Reise mit den ersten Siedlern und verfolgen Sie die Entwicklung durch die Jahrhunderte. Sehen Sie, wie sich die Architektur veränderte, wie neue Familien hinzukamen und wie sich das Dorfbild wandelte.\n\nBesonders wertvoll sind die Sammlungen historischer Fotografien, die das tägliche Leben in verschiedenen Epochen dokumentieren. Zeitzeugenberichte lassen die Vergangenheit lebendig werden und zeigen, wie sich Traditionen über Generationen erhalten haben.",
      startDate: "2023-06-01",
      endDate: null,
      image: "/images/village-history.jpg",
      status: "Dauerausstellung",
      price: "6€",
      highlights: ["Historische Fotografien", "Dorfchronik", "Zeitzeugenberichte"],
      details: {
        duration: "80 Minuten",
        rooms: 2,
        artifacts: 120,
        interactiveStations: 5,
        audioGuide: true,
        wheelchairAccessible: true,
        parking: "Kostenlos vor dem Museum",
        openingHours: "Di-So: 10:00-17:00",
        lastEntry: "16:30"
      },
      gallery: [
        "/images/village-old-photos.jpg",
        "/images/village-documents.jpg",
        "/images/village-modern.jpg",
        "/images/village-families.jpg"
      ]
    },
    {
      id: 5,
      title: "Handwerk und Gewerbe",
      description: "Traditionelle Handwerkskunst und die Entwicklung des Gewerbes in der Region. Mit funktionsfähigen Werkstätten und Demonstrationen.",
      fullDescription: "Erleben Sie die reiche Handwerkstradition von Ernsthausen! Diese interaktive Ausstellung zeigt die verschiedenen Gewerbe, die über Jahrhunderte das wirtschaftliche Rückgrat unseres Dorfes bildeten.\n\nBesuchen Sie funktionsfähige Werkstätten eines Schmieds, Schreiners, Webers und Töpfers. Sehen Sie zu, wie erfahrene Handwerker traditionelle Techniken demonstrieren, und probieren Sie selbst einige einfache Handgriffe aus.\n\nDie Ausstellung zeigt auch, wie sich das Handwerk im Laufe der Zeit veränderte und wie manche Traditionen bis heute fortleben. Besonders für Familien ist dies ein faszinierendes Erlebnis mit vielen Mitmach-Stationen.",
      startDate: "2023-03-15",
      endDate: null,
      image: "/images/crafts-exhibition.jpg",
      status: "Dauerausstellung",
      price: "6€",
      highlights: ["Funktionsfähige Werkstätten", "Live-Demonstrationen", "Mitmach-Stationen"],
      details: {
        duration: "100 Minuten",
        rooms: 4,
        artifacts: 160,
        interactiveStations: 12,
        audioGuide: true,
        wheelchairAccessible: false,
        parking: "Kostenlos vor dem Museum",
        openingHours: "Di-So: 10:00-17:00",
        lastEntry: "16:00"
      },
      gallery: [
        "/images/blacksmith-workshop.jpg",
        "/images/carpenter-tools.jpg",
        "/images/weaving-loom.jpg",
        "/images/pottery-wheel.jpg"
      ]
    },
    {
      id: 6,
      title: "Traditionen und Feste",
      description: "Erleben Sie die reiche Tradition der Dorfgemeinschaft mit historischen Kostümen, Festbräuchen und regionalen Besonderheiten.",
      fullDescription: "Tauchen Sie ein in die lebendigen Traditionen von Ernsthausen! Diese farbenfrohe Ausstellung zeigt die Feste und Bräuche, die über Generationen hinweg die Dorfgemeinschaft zusammengehalten haben.\n\nBewundern Sie prächtige historische Trachten und Festkleider, erfahren Sie mehr über traditionelle Tänze und Musik, und entdecken Sie, wie sich die Feste im Laufe der Jahrhunderte entwickelt haben.\n\nInteraktive Bereiche laden ein, traditionelle Tänze zu erlernen, historische Instrumente auszuprobieren oder sich in traditionelle Gewänder zu kleiden. Besonders zur Erntezeit und zu Weihnachten werden spezielle Programme angeboten.",
      startDate: "2022-01-01",
      endDate: null,
      image: "/images/traditions-festivals.jpg",
      status: "Dauerausstellung",
      price: "5€",
      highlights: ["Historische Kostüme", "Festbräuche", "Interaktive Mitmachangebote"],
      details: {
        duration: "70 Minuten",
        rooms: 2,
        artifacts: 90,
        interactiveStations: 8,
        audioGuide: true,
        wheelchairAccessible: true,
        parking: "Kostenlos vor dem Museum",
        openingHours: "Di-So: 10:00-17:00",
        lastEntry: "16:30"
      },
      gallery: [
        "/images/traditional-costumes.jpg",
        "/images/festival-photos.jpg",
        "/images/folk-instruments.jpg",
        "/images/dance-demonstrations.jpg"
      ]
    },
    {
      id: 7,
      title: "Natur und Umwelt",
      description: "Die einzigartige Flora und Fauna rund um Ernsthausen. Von heimischen Tieren bis zu seltenen Pflanzenarten.",
      fullDescription: "Entdecken Sie die natürliche Schönheit und Vielfalt der Region um Ernsthausen! Diese bildungsreiche Ausstellung zeigt die reiche Flora und Fauna unserer Heimat und wie sie sich über die Jahre verändert hat.\n\nLernen Sie heimische Tierarten kennen, von häufigen Vögeln bis zu seltenen Insekten. Ein besonderer Bereich widmet sich dem angrenzenden Wald und seinen Bewohnern. Interaktive Stationen ermöglichen es, Tierstimmen zu hören und Spuren zu identifizieren.\n\nDer botanische Teil zeigt die Pflanzenvielfalt der Region, von Heilkräutern, die traditionell genutzt wurden, bis zu modernen Naturschutzprojekten. Ein kleiner Garten im Freien ergänzt die Ausstellung perfekt.",
      startDate: "2022-05-01",
      endDate: null,
      image: "/images/nature-environment.jpg",
      status: "Dauerausstellung",
      price: "7€",
      highlights: ["Heimische Tierwelt", "Botanischer Garten", "Umweltbildung"],
      details: {
        duration: "85 Minuten",
        rooms: 3,
        artifacts: 110,
        interactiveStations: 9,
        audioGuide: true,
        wheelchairAccessible: true,
        parking: "Kostenlos vor dem Museum",
        openingHours: "Di-So: 10:00-17:00",
        lastEntry: "16:30"
      },
      gallery: [
        "/images/forest-animals.jpg",
        "/images/bird-collection.jpg",
        "/images/botanical-garden.jpg",
        "/images/nature-education.jpg"
      ]
    },
    {
      id: 8,
      title: "Archäologie und Vorgeschichte",
      description: "Funde aus der Steinzeit bis zum Mittelalter zeigen die lange Besiedlungsgeschichte der Region Ernsthausen.",
      fullDescription: "Begeben Sie sich auf eine Zeitreise zu den ersten Bewohnern unserer Region! Diese faszinierende Ausstellung präsentiert archäologische Funde, die belegen, dass die Gegend um Ernsthausen bereits seit der Steinzeit besiedelt ist.\n\nBestaunen Sie steinzeitliche Werkzeuge, römische Münzen und mittelalterliche Keramik, die alle in der näheren Umgebung gefunden wurden. Jeder Fund erzählt eine Geschichte über das Leben unserer Vorfahren.\n\nInteraktive Bereiche zeigen, wie Archäologen arbeiten und wie aus kleinen Fundstücken große Geschichten entstehen. Besonders spannend ist die Rekonstruktion eines mittelalterlichen Dorfes anhand der Grabungsergebnisse.",
      startDate: "2021-01-01",
      endDate: null,
      image: "/images/archaeology.jpg",
      status: "Dauerausstellung",
      price: "8€",
      highlights: ["Steinzeitfunde", "Mittelalterliche Artefakte", "Ausgrabungsberichte"],
      details: {
        duration: "95 Minuten",
        rooms: 3,
        artifacts: 140,
        interactiveStations: 7,
        audioGuide: true,
        wheelchairAccessible: true,
        parking: "Kostenlos vor dem Museum",
        openingHours: "Di-So: 10:00-17:00",
        lastEntry: "16:00"
      },
      gallery: [
        "/images/stone-age-tools.jpg",
        "/images/roman-artifacts.jpg",
        "/images/medieval-pottery.jpg",
        "/images/excavation-site.jpg"
      ]
    }
  ]

  const exhibition = exhibitions.find(ex => ex.id === exhibitionId)

  if (!exhibition) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Ausstellung nicht gefunden</h1>
          <Link href="/exhibitions" className="text-amber-600 hover:text-amber-700">
            Zurück zu allen Ausstellungen
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-800 to-orange-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <Link 
              href="/exhibitions" 
              className="text-amber-200 hover:text-white mr-4"
            >
              ← Zurück zu Ausstellungen
            </Link>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              exhibition.status === 'Aktuelle Sonderausstellung' 
                ? 'bg-red-100 text-red-800' 
                : exhibition.status === 'Kommende Sonderausstellung'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-blue-100 text-blue-800'
            }`}>
              {exhibition.status}
            </span>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {exhibition.title}
              </h1>
              <p className="text-xl text-amber-100 mb-6">
                {exhibition.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <span className="text-2xl font-bold text-yellow-300">
                  {exhibition.price}
                </span>
                <span className="text-amber-200">
                  Dauer: {exhibition.details.duration}
                </span>
                <span className="text-amber-200">
                  {exhibition.details.rooms} Räume
                </span>
              </div>
            </div>
            
            <div className="relative">
              <div className="h-64 bg-gradient-to-br from-amber-100 to-orange-200 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-amber-200 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-10 h-10 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <p className="text-amber-700 font-medium">Ausstellungsbild</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'overview', label: 'Übersicht' },
              { id: 'details', label: 'Details' },
              { id: 'gallery', label: 'Galerie' },
              { id: 'visit', label: 'Besuch planen' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-amber-600 text-amber-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Über diese Ausstellung</h2>
                  <div className="prose prose-lg text-gray-600">
                    {exhibition.fullDescription.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="mb-4">{paragraph}</p>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Highlights</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {exhibition.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center p-4 bg-amber-50 rounded-lg">
                        <svg className="w-6 h-6 text-amber-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium text-gray-900">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Schnellinfos</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Preis:</span>
                      <span className="font-semibold text-amber-600">{exhibition.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Dauer:</span>
                      <span className="font-semibold">{exhibition.details.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Räume:</span>
                      <span className="font-semibold">{exhibition.details.rooms}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Exponate:</span>
                      <span className="font-semibold">{exhibition.details.artifacts}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Audioguide:</span>
                      <span className="font-semibold">{exhibition.details.audioGuide ? 'Ja' : 'Nein'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Barrierefrei:</span>
                      <span className="font-semibold">{exhibition.details.wheelchairAccessible ? 'Ja' : 'Nein'}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Jetzt buchen</h3>
                  <div className="space-y-3">
                    <button 
                      onClick={() => handleBookingClick(exhibition.id, 'tour')}
                      className="block w-full bg-amber-600 text-white text-center py-3 px-4 rounded-lg hover:bg-amber-700 transition-colors font-medium"
                    >
                      {user ? 'Führung buchen' : 'Anmelden & Führung buchen'}
                    </button>
                    <button 
                      onClick={() => handleBookingClick(exhibition.id, 'group')}
                      className="block w-full border border-amber-600 text-amber-600 text-center py-3 px-4 rounded-lg hover:bg-amber-50 transition-colors font-medium"
                    >
                      {user ? 'Gruppenbesuch' : 'Anmelden & Gruppenbesuch'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Details Tab */}
          {activeTab === 'details' && (
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Detaillierte Informationen</h2>
                <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Ausstellungsdaten</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Anzahl Räume:</span>
                        <p className="font-semibold">{exhibition.details.rooms} Räume</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Exponate:</span>
                        <p className="font-semibold">{exhibition.details.artifacts} Stück</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Interaktive Stationen:</span>
                        <p className="font-semibold">{exhibition.details.interactiveStations} Stationen</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Empfohlene Dauer:</span>
                        <p className="font-semibold">{exhibition.details.duration}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Ausstattung</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <svg className={`w-5 h-5 mr-2 ${exhibition.details.audioGuide ? 'text-green-500' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className={exhibition.details.audioGuide ? 'text-gray-900' : 'text-gray-500'}>
                          Audioguide verfügbar
                        </span>
                      </div>
                      <div className="flex items-center">
                        <svg className={`w-5 h-5 mr-2 ${exhibition.details.wheelchairAccessible ? 'text-green-500' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className={exhibition.details.wheelchairAccessible ? 'text-gray-900' : 'text-gray-500'}>
                          Barrierefrei zugänglich
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Besucherinformationen</h2>
                <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Öffnungszeiten</h3>
                    <p className="text-gray-600">{exhibition.details.openingHours}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Letzter Einlass: {exhibition.details.lastEntry}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Anfahrt & Parken</h3>
                    <p className="text-gray-600">{exhibition.details.parking}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Preise</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Erwachsene:</span>
                        <span className="font-semibold">{exhibition.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Kinder (6-16):</span>
                        <span className="font-semibold">3€</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Familienkarte:</span>
                        <span className="font-semibold">15€</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Gallery Tab */}
          {activeTab === 'gallery' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Bildergalerie</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {exhibition.gallery.map((image, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="h-48 bg-gradient-to-br from-amber-100 to-orange-200 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-amber-200 rounded-full flex items-center justify-center mx-auto mb-2">
                          <svg className="w-8 h-8 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <p className="text-amber-700 text-sm font-medium">Galeriebild {index + 1}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Visit Planning Tab */}
          {activeTab === 'visit' && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Ihren Besuch planen</h2>
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Führungen</h3>
                    <p className="text-gray-600 mb-4">
                      Erleben Sie die Ausstellung mit einem erfahrenen Guide, der Ihnen 
                      spannende Hintergrundgeschichten und Details vermittelt.
                    </p>
                    <button 
                      onClick={() => handleBookingClick(exhibition.id, 'tour')}
                      className="block w-full bg-amber-600 text-white text-center py-3 px-4 rounded-lg hover:bg-amber-700 transition-colors font-medium"
                    >
                      {user ? 'Führung buchen' : 'Anmelden & Führung buchen'}
                    </button>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Gruppenbesuche</h3>
                    <p className="text-gray-600 mb-4">
                      Planen Sie einen Besuch mit Ihrer Gruppe, Schulklasse oder Verein. 
                      Wir bieten spezielle Programme und Rabatte.
                    </p>
                    <button 
                      onClick={() => handleBookingClick(exhibition.id, 'group')}
                      className="block w-full border border-amber-600 text-amber-600 text-center py-3 px-4 rounded-lg hover:bg-amber-50 transition-colors font-medium"
                    >
                      {user ? 'Gruppenbesuch planen' : 'Anmelden & Gruppenbesuch planen'}
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-blue-50 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Tipps für Ihren Besuch</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Planen Sie etwa {exhibition.details.duration} für die Ausstellung ein
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Letzter Einlass ist um {exhibition.details.lastEntry}
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {exhibition.details.audioGuide ? 'Audioguide kostenlos verfügbar' : 'Kein Audioguide verfügbar'}
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Kostenlose Parkplätze vor dem Museum
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Kontakt & Information</h3>
                    <div className="space-y-2 text-gray-600">
                      <p>📞 06458 - 123456</p>
                      <p>✉️ info@Museum-ernsthausen.de</p>
                      <p>🕒 {exhibition.details.openingHours}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
