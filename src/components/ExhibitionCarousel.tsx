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

interface ExhibitionCarouselProps {
  className?: string
}

export default function ExhibitionCarousel({ className = "" }: ExhibitionCarouselProps) {
  const exhibitionImages = [
    {
      id: 1,
      src: "/Museum.jpg",
      alt: "Schulzeit in Ernsthausen Ausstellung",
      title: "Schulzeit in Ernsthausen",
      description: "100 Jahre Bildungsgeschichte mit historischen Schulbüchern und originalem Klassenzimmer",
      period: "1900 - 2000",
      type: "Sonderausstellung"
    },
    {
      id: 2,
      src: "/Museum1.jpg",
      alt: "Kriegszeit und Wiederaufbau Ausstellung",
      title: "Kriegszeit und Wiederaufbau",
      description: "Eine bewegende Ausstellung über die schweren Jahre und den mutigen Wiederaufbau",
      period: "1939 - 1960",
      type: "Kommende Ausstellung"
    },
    {
      id: 3,
      src: "/Museum2.jpg",
      alt: "Landwirtschaft im Wandel Ausstellung",
      title: "Landwirtschaft im Wandel",
      description: "150 Jahre landwirtschaftlicher Fortschritt von traditionell zu modern",
      period: "1850 - heute",
      type: "Kommende Ausstellung"
    },
    {
      id: 4,
      src: "/Museum.jpg",
      alt: "Dorfgeschichte Ernsthausen",
      title: "Dorfgeschichte Ernsthausen",
      description: "Die Entwicklung unseres Ortes mit Fotografien, Dokumenten und Geschichten",
      period: "Seit Gründung",
      type: "Dauerausstellung"
    },
    {
      id: 5,
      src: "/Museum1.jpg",
      alt: "Handwerk und Gewerbe",
      title: "Handwerk und Gewerbe",
      description: "Traditionelle Handwerkskunst mit funktionsfähigen Werkstätten",
      period: "18. - 20. Jahrhundert",
      type: "Dauerausstellung"
    },
    {
      id: 6,
      src: "/Museum2.jpg",
      alt: "Traditionen und Feste",
      title: "Traditionen und Feste",
      description: "Reiche Tradition der Dorfgemeinschaft mit historischen Kostümen",
      period: "Jahreszyklen",
      type: "Dauerausstellung"
    }
  ]

  return (
    <div className={`w-full ${className}`}>
      <Carousel 
        className="w-full"
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {exhibitionImages.map((image) => (
            <CarouselItem key={image.id}>
              <Card className="border-0 bg-transparent">
                <CardContent className="p-0">
                  <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden rounded-xl">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover object-center transition-transform duration-500 hover:scale-105"
                      priority={image.id === 1}
                      sizes="100vw"
                    />
                    {/* Overlay with exhibition info */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end">
                      <div className="p-6 md:p-8 lg:p-12 text-white w-full">
                        <div className="max-w-4xl">
                          <div className="flex flex-wrap gap-2 mb-3">
                            <span className="px-3 py-1 bg-amber-600 text-white text-sm font-medium rounded-full">
                              {image.type}
                            </span>
                            <span className="px-3 py-1 bg-white/20 text-white text-sm font-medium rounded-full">
                              {image.period}
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
