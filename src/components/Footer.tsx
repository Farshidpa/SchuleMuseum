import { Facebook } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Museum Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4">
              Historisches Museum Ernsthausen
            </h3>
            <p className="text-gray-300 mb-4">
              Entdecken Sie die faszinierende Geschichte unserer Schule und
              Region. Seit 1890 bewahren wir das kulturelle Erbe für kommende
              Generationen.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 320 512"
                  role="img"
                  aria-label="Facebook logo"
                >
                  <path
                    fill="currentColor"
                    d="M279.14 288l14.22-92.66h-88.91V127.9c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S259.35 0 225.36 0c-73.22 0-121.06 44.38-121.06 124.72V195.3H22.89V288h81.41v224h100.2V288h74.64z"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 1200 1227"
                  role="img"
                  aria-label="X (formerly Twitter) logo"
                >
                  <path
                    fill="currentColor"
                    d="M714.163 519.284L1160.89 0H1055.03L667.137 
      450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.671 
      750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.155 
      686.087L521.697 617.73L144.011 79.6945H306.615L611.412 
      515.445L658.87 583.802L1055.11 1150.3H892.506L569.155 
      686.113V686.087Z"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.739.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Schnellzugriff</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/exhibitions"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Ausstellungen
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Veranstaltungen
                </Link>
              </li>
              <li>
                <Link
                  href="/booking"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Buchungen
                </Link>
              </li>
              <li>
                <Link
                  href="/info"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Besucherinfo
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Kontakt</h4>
            <div className="space-y-2 text-gray-300">
              <p>Museumstraße 1</p>
              <p>12345 Ernsthausen</p>
              <p>Tel: +49 (0) 123 456789</p>
              <p>parvizianfarshid@gmail.com</p>
            </div>
            <div className="mt-4">
              <h5 className="font-semibold mb-2">Öffnungszeiten</h5>
              <div className="text-sm text-gray-300">
                <p>Di-So: 10:00 - 18:00 Uhr</p>
                <p>Montags geschlossen</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="text-gray-300 text-sm">
            © 2025 Historisches Museum Ernsthausen. Alle Rechte vorbehalten.
          </div>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link
              href="/privacy"
              className="text-gray-300 hover:text-white text-sm transition-colors"
            >
              Datenschutz
            </Link>
            <Link
              href="/imprint"
              className="text-gray-300 hover:text-white text-sm transition-colors"
            >
              Impressum
            </Link>
            <Link
              href="/terms"
              className="text-gray-300 hover:text-white text-sm transition-colors"
            >
              AGB
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
