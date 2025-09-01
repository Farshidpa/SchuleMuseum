import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-800 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Über das SchuleMuseum Ernsthausen
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              Entdecken Sie die faszinierende Geschichte der Bildung in unserer Region
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Unsere Mission
              </h2>
              <div className="space-y-4 text-gray-600">
                <p className="text-lg">
                  Das SchuleMuseum Ernsthausen bewahrt und vermittelt die Geschichte 
                  des Bildungswesens in unserer Region. Wir zeigen, wie sich Schule 
                  und Lernen über die Jahrhunderte entwickelt haben.
                </p>
                <p>
                  Von der einklassigen Dorfschule bis zur modernen Bildungseinrichtung - 
                  unser Museum macht Geschichte lebendig und zeigt die Entwicklung 
                  pädagogischer Methoden, Schulausstattung und des Schulalltags.
                </p>
                <p>
                  Besucher jeden Alters können hier eine Zeitreise unternehmen und 
                  verstehen, wie Bildung früher funktionierte und welche Herausforderungen 
                  Schüler und Lehrer meistern mussten.
                </p>
              </div>
            </div>
            <div className="relative h-96 bg-gray-200 rounded-xl overflow-hidden">
              <Image
                src="/Museum4.jpg"
                alt="Historisches Klassenzimmer im SchuleMuseum Ernsthausen"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end">
                <div className="p-4 text-white">
                  <p className="text-lg font-semibold drop-shadow-lg">Historisches Tepisch</p>
                  <p className="text-sm opacity-90 drop-shadow-md"> 19. Jahrhundert</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Geschichte des Museums
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Erfahren Sie mehr über die Entstehung und Entwicklung unseres Museums
            </p>
          </div>

          <div className="space-y-12">
            {/* Timeline */}
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-200"></div>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    1995
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Gründung des Museumsvereins
                    </h3>
                    <p className="text-gray-600">
                      Engagierte Bürger gründen den Museumsverein mit dem Ziel, 
                      die Schulgeschichte von Ernsthausen zu bewahren. Die ersten 
                      Exponate werden gesammelt und katalogisiert.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    2001
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Eröffnung des Museums
                    </h3>
                    <p className="text-gray-600">
                      Das SchuleMuseum öffnet erstmals seine Türen in den Räumen 
                      der ehemaligen Dorfschule. Die authentische Umgebung macht 
                      Geschichte für Besucher erlebbar.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    2010
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Erweiterung der Sammlung
                    </h3>
                    <p className="text-gray-600">
                      Die Sammlung wird erheblich erweitert. Neue Themenbereiche 
                      wie &ldquo;Schulspeisung&rdquo; und &ldquo;Schulkleidung&rdquo; kommen hinzu. 
                      Das Museum wird modernisiert und barrierefrei gestaltet.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    2020
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Digitale Transformation
                    </h3>
                    <p className="text-gray-600">
                      Das Museum wird digital: Interaktive Stationen, ein Online-Katalog 
                      und virtuelle Führungen erweitern das Angebot. Die Corona-Pandemie 
                      beschleunigt die digitale Entwicklung.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                    2024
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Jubiläum und Neueröffnung
                    </h3>
                    <p className="text-gray-600">
                      Das Museum feiert sein 25-jähriges Bestehen mit einer komplett 
                      überarbeiteten Ausstellung und neuen interaktiven Elementen. 
                      Eine neue Website und Online-Buchungssystem werden eingeführt.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Unser Team
            </h2>
            <p className="text-lg text-gray-600">
              Lernen Sie die Menschen kennen, die unser Museum lebendig machen
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Dr. Farshid Parvizian
              </h3>
              <p className="text-blue-600 font-medium mb-2">Museumsleitung</p>
              <p className="text-gray-600 text-sm">
                Historikerin mit Schwerpunkt Bildungsgeschichte. 
                Leitet das Museum seit 2015 und ist verantwortlich 
                für die wissenschaftliche Aufarbeitung der Sammlung.
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Prof. Daniel Döbel
              </h3>
              <p className="text-blue-600 font-medium mb-2">Museumsführer</p>
              <p className="text-gray-600 text-sm">
                Ehemaliger Lehrer und leidenschaftlicher Geschichtserzähler. 
                Hans führt seit 20 Jahren Besucher durch das Museum und 
                teilt seine Erfahrungen aus 40 Jahren Schuldienst.
              </p>
            </div>

            {/* Team Member 3 */}
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Dr. Frank Behlau
              </h3>
              <p className="text-blue-600 font-medium mb-2">Museumspädagogin</p>
              <p className="text-gray-600 text-sm">
                Entwickelt und betreut unsere Bildungsprogramme für Schulklassen. 
                Spezialisiert auf interaktive Lernmethoden und digitale 
                Vermittlungsformen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Auszeichnungen & Anerkennung
            </h2>
            <p className="text-lg text-gray-600">
              Unser Engagement wird geschätzt und ausgezeichnet
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Museumspreis Hessen 2018
              </h3>
              <p className="text-gray-600 text-sm">
                Auszeichnung für herausragende Vermittlungsarbeit 
                und innovative Bildungsprogramme
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Zertifikat &ldquo;Familienfreundliches Museum&rdquo;
              </h3>
              <p className="text-gray-600 text-sm">
                Auszeichnung für besonders familiengerechte Ausstellungsgestaltung 
                und Vermittlungskonzepte
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Ehrenamtspreis der Gemeinde
              </h3>
              <p className="text-gray-600 text-sm">
                Würdigung des außergewöhnlichen ehrenamtlichen Engagements 
                unserer Vereinsmitglieder
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visit Information */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Besuchen Sie uns
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Öffnungszeiten</h3>
              <div className="space-y-2 text-gray-600">
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

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Kontakt</h3>
              <div className="space-y-2 text-gray-600">
                <div>📍 Schulstraße 15, 36287 Ernsthausen</div>
                <div>📞 06642 / 91 91 91</div>
                <div>✉️ info@schulemuseum.de</div>
                <div>🌐 www.schulemuseum-ernsthausen.de</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
