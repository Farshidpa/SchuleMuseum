export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Datenschutzerklärung
          </h1>

          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              1. Datenschutz auf einen Blick
            </h2>
            <p className="text-gray-600 mb-4">
              Der Schutz Ihrer persönlichen Daten ist uns wichtig. Diese Datenschutzerklärung 
              informiert Sie darüber, welche personenbezogenen Daten wir erheben und wie wir 
              mit ihnen umgehen.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              2. Verantwortliche Stelle
            </h2>
            <p className="text-gray-600 mb-4">
              Verantwortlich für die Datenverarbeitung ist:<br />
              Schulmuseum Ernsthausen<br />
              Schulstraße 15<br />
              36287 Ernsthausen<br />
              E-Mail: info@Schulmuseum.de<br />
              Telefon: 06642 / 91 91 91
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              3. Erhebung und Speicherung personenbezogener Daten
            </h2>
            <p className="text-gray-600 mb-4">
              Wir erheben personenbezogene Daten nur, wenn Sie uns diese freiwillig mitteilen, 
              etwa bei:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-4">
              <li>Buchung von Führungen oder Veranstaltungen</li>
              <li>Kontaktaufnahme über unser Kontaktformular</li>
              <li>Anmeldung zum Newsletter</li>
              <li>Registrierung auf unserer Website</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              4. Verwendung Ihrer Daten
            </h2>
            <p className="text-gray-600 mb-4">
              Ihre Daten verwenden wir ausschließlich für:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-4">
              <li>Abwicklung Ihrer Buchungen</li>
              <li>Beantwortung Ihrer Anfragen</li>
              <li>Versendung des Newsletters (nur mit Ihrer Einwilligung)</li>
              <li>Verbesserung unserer Dienstleistungen</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              5. Weitergabe von Daten
            </h2>
            <p className="text-gray-600 mb-4">
              Eine Weitergabe Ihrer Daten an Dritte erfolgt nicht, es sei denn:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-4">
              <li>Sie haben ausdrücklich eingewilligt</li>
              <li>Die Weitergabe ist zur Vertragserfüllung erforderlich</li>
              <li>Wir sind gesetzlich dazu verpflichtet</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              6. Speicherdauer
            </h2>
            <p className="text-gray-600 mb-4">
              Wir speichern Ihre Daten nur so lange, wie es für die jeweiligen Zwecke 
              erforderlich ist oder gesetzliche Aufbewahrungsfristen dies verlangen. 
              Buchungsdaten werden in der Regel 3 Jahre aufbewahrt.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              7. Cookies und Website-Analyse
            </h2>
            <p className="text-gray-600 mb-4">
              Unsere Website verwendet nur technisch notwendige Cookies. Diese sind 
              erforderlich für den Betrieb der Website und können nicht deaktiviert werden.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              8. Ihre Rechte
            </h2>
            <p className="text-gray-600 mb-4">
              Sie haben folgende Rechte bezüglich Ihrer personenbezogenen Daten:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-4">
              <li>Recht auf Auskunft über die gespeicherten Daten</li>
              <li>Recht auf Berichtigung unrichtiger Daten</li>
              <li>Recht auf Löschung der Daten</li>
              <li>Recht auf Einschränkung der Verarbeitung</li>
              <li>Recht auf Datenübertragbarkeit</li>
              <li>Widerspruchsrecht gegen die Verarbeitung</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              9. Newsletter
            </h2>
            <p className="text-gray-600 mb-4">
              Wenn Sie unseren Newsletter abonnieren, verwenden wir Ihre E-Mail-Adresse 
              ausschließlich für den Versand von Informationen über Veranstaltungen und 
              Neuigkeiten. Sie können den Newsletter jederzeit abbestellen.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              10. Kontakt
            </h2>
            <p className="text-gray-600 mb-4">
              Bei Fragen zum Datenschutz wenden Sie sich gerne an uns:
            </p>
            <p className="text-gray-600 mb-4">
              E-Mail: datenschutz@Schulmuseum.de<br />
              Telefon: 06642 / 91 91 91
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              11. Beschwerderecht
            </h2>
            <p className="text-gray-600 mb-4">
              Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über 
              unsere Verarbeitung personenbezogener Daten zu beschweren.
            </p>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Stand: August 2024<br />
                Diese Datenschutzerklärung wird regelmäßig überprüft und bei Bedarf aktualisiert.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
