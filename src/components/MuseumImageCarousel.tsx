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

interface MuseumImageCarouselProps {
  className?: string
}

export default function MuseumImageCarousel({ className = "" }: MuseumImageCarouselProps) {

  const museumImages = [
    {
      id: 1,
      src: "/Museum.jpg",
      alt: "Museum Ernsthausen - Hauptgebäude",
      title: "Museum Ernsthausen",
      description: "Willkommen in unserem historischen Museum"
    },
    {
      id: 2,
      src: "/Museum1.jpg",
      alt: "Museum Ernsthausen - Ausstellungsbereich",
      title: "Unsere Ausstellungen",
      description: "Entdecken Sie faszinierende Exponate aus verschiedenen Epochen"
    },
    {
      id: 3,
      src: "/Museum2.jpg",
      alt: "Museum Ernsthausen - Historische Sammlung",
      title: "Historische Sammlungen",
      description: "100 Jahre Geschichte zum Anfassen und Erleben"
    },
    {
      id: 4,
      src: "/Museum.jpg",
      alt: "Museum Ernsthausen - Führungen",
      title: "Geführte Touren",
      description: "Erleben Sie Geschichte mit unseren Experten"
    },
    {
      id: 5,
      src: "/Museum1.jpg",
      alt: "Museum Ernsthausen - Bildungsprogramm",
      title: "Bildungsprogramme",
      description: "Lernen Sie in unserem interaktiven Umfeld"
    },
    {
      id: 6,
      src: "/Museum2.jpg",
      alt: "Museum Ernsthausen - Veranstaltungen",
      title: "Besondere Veranstaltungen",
      description: "Workshops, Vorträge und kulturelle Events"
    }
  ]

  return (
    <div className={`w-full relative ${className}`}>
      <Carousel
        className="w-full"
        plugins={[
          Autoplay({
            delay: 4000,
          }),
        ]}
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {museumImages.map((image) => (
            <CarouselItem key={image.id}>
              <Card className="border-0 bg-transparent">
                <CardContent className="p-0">
                  <div className="relative w-full h-[450px] md:h-[550px] lg:h-[600px] overflow-hidden">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover object-center transition-transform duration-300 hover:scale-105"
                      priority={image.id === 1}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                    />
                    {/* Overlay with text */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end">
                      <div className="p-6 md:p-8 text-white w-full">
                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 drop-shadow-lg">
                          {image.title}
                        </h3>
                        <p className="text-lg md:text-xl lg:text-2xl opacity-90 drop-shadow-md max-w-2xl">
                          {image.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
