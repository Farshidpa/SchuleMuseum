'use client'

import Image from 'next/image'
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"

interface EventCarouselProps {
  className?: string
}

export default function EventCarousel({ className = "" }: EventCarouselProps) {
  const eventImages = [
    {
      id: 1,
      src: "/Museum.jpg",
      alt: "Führungen im Museum",
      title: "Geführte Museumstouren",
      description: "Entdecken Sie unser Museum mit erfahrenen Guides und erfahren Sie spannende Geschichten",
      eventType: "Führung",
      duration: "90 Minuten"
    },
    {
      id: 2,
      src: "/Museum1.jpg",
      alt: "Workshops im Museum",
      title: "Interaktive Workshops",
      description: "Lernen Sie traditionelle Handwerkstechniken und historische Fertigkeiten",
      eventType: "Workshop",
      duration: "2-3 Stunden"
    },
    {
      id: 3,
      src: "/Museum2.jpg",
      alt: "Vorträge und Präsentationen",
      title: "Fachvorträge & Präsentationen",
      description: "Hören Sie Expertenvorträge über regionale Geschichte und kulturelle Entwicklung",
      eventType: "Vortrag",
      duration: "60-90 Minuten"
    },
    {
      id: 4,
      src: "/Museum.jpg",
      alt: "Gruppenveranstaltungen",
      title: "Gruppenveranstaltungen",
      description: "Spezielle Programme für Schulklassen, Vereine und private Gruppen",
      eventType: "Gruppenbesuch",
      duration: "Flexibel"
    },
    {
      id: 5,
      src: "/Museum1.jpg",
      alt: "Sonderveranstaltungen",
      title: "Besondere Events",
      description: "Kulturelle Veranstaltungen, Ausstellungseröffnungen und Themennächte",
      eventType: "Sonderevent",
      duration: "Variabel"
    },
    {
      id: 6,
      src: "/Museum2.jpg",
      alt: "Familienprogramm",
      title: "Familienprogramm",
      description: "Spezielle Angebote für Familien mit Kindern jeden Alters",
      eventType: "Familie",
      duration: "1-2 Stunden"
    }
  ]

  return (
    <div className={`w-full ${className}`}>
      <Carousel 
        className="w-full"
        plugins={[
          Autoplay({
            delay: 4500,
          }),
        ]}
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {eventImages.map((image) => (
            <CarouselItem key={image.id}>
              <Card className="border-0 bg-transparent">
                <CardContent className="p-0">
                  <div className="relative w-full h-[450px] md:h-[550px] lg:h-[650px] overflow-hidden rounded-xl">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover object-center transition-transform duration-500 hover:scale-105"
                      priority={image.id === 1}
                      sizes="100vw"
                    />
                    {/* Overlay with event info */}
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-800/40 to-transparent flex items-end">
                      <div className="p-6 md:p-8 lg:p-12 text-white w-full">
                        <div className="max-w-4xl">
                          <div className="flex flex-wrap gap-2 mb-3">
                            <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                              {image.eventType}
                            </span>
                            <span className="px-3 py-1 bg-white/20 text-white text-sm font-medium rounded-full">
                              {image.duration}
                            </span>
                          </div>
                          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 drop-shadow-lg">
                            {image.title}
                          </h3>
                          <p className="text-lg md:text-xl lg:text-2xl opacity-90 drop-shadow-md leading-relaxed">
                            {image.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 bg-white/80 hover:bg-white border-0 text-gray-800 w-12 h-12" />
        <CarouselNext className="right-4 bg-white/80 hover:bg-white border-0 text-gray-800 w-12 h-12" />
      </Carousel>
    </div>
  )
}
