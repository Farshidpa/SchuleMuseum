'use client'

import Image from 'next/image'
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
  // Array of museum images - using Museum.jpg for all for now, but structure allows for multiple images
  const museumImages = [
    {
      id: 1,
      src: "/Museum.jpg",
      alt: "Museum Ernsthausen - Hauptansicht",
      title: "Museum Ernsthausen",
      description: "Willkommen in unserem historischen Museum"
    },
    {
      id: 2,
      src: "/Museum.jpg",
      alt: "Museum Ernsthausen - Ausstellungsbereich",
      title: "Unsere Ausstellungen",
      description: "Entdecken Sie faszinierende Exponate"
    },
    {
      id: 3,
      src: "/Museum.jpg",
      alt: "Museum Ernsthausen - Historische Sammlung",
      title: "Historische Sammlungen",
      description: "100 Jahre Geschichte zum Anfassen"
    },
    {
      id: 4,
      src: "/Museum.jpg",
      alt: "Museum Ernsthausen - Führungen",
      title: "Geführte Touren",
      description: "Erleben Sie Geschichte mit unseren Experten"
    }
  ]

  return (
    <div className={`w-full ${className}`}>
      <Carousel className="w-full">
        <CarouselContent>
          {museumImages.map((image) => (
            <CarouselItem key={image.id}>
              <Card className="border-0 bg-transparent">
                <CardContent className="p-0">
                  <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-xl">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                      priority={image.id === 1}
                    />
                    {/* Overlay with text */}
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                      <div className="p-6 md:p-8 text-white">
                        <h3 className="text-2xl md:text-3xl font-bold mb-2">
                          {image.title}
                        </h3>
                        <p className="text-lg md:text-xl opacity-90">
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
        <CarouselPrevious className="left-4 bg-white/80 hover:bg-white border-0 text-gray-800" />
        <CarouselNext className="right-4 bg-white/80 hover:bg-white border-0 text-gray-800" />
      </Carousel>
    </div>
  )
}
