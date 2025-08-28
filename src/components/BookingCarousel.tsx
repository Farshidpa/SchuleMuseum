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

interface BookingCarouselProps {
  className?: string
}

export default function BookingCarousel({ className = "" }: BookingCarouselProps) {
  const bookingImages = [
    {
      id: 1,
      src: "/Museum.jpg",
      alt: "Buchen Sie Ihren Museumsbesuch",
      title: "Ihren Besuch planen",
      description: "Einfach online buchen und Ihren perfekten Museumsbesuch reservieren",
      feature: "Online Buchung",
      price: "Ab 5€"
    },
    {
      id: 2,
      src: "/Museum1.jpg",
      alt: "Gruppenführungen buchen",
      title: "Gruppenführungen",
      description: "Spezielle Führungen für Schulklassen, Vereine und private Gruppen",
      feature: "Gruppenerlebnis",
      price: "Ab 8€ pro Person"
    },
    {
      id: 3,
      src: "/Museum2.jpg",
      alt: "Workshop Buchungen",
      title: "Workshop & Events",
      description: "Interaktive Workshops und besondere Veranstaltungen für alle Altersgruppen",
      feature: "Hands-on Erfahrung",
      price: "Ab 12€ pro Person"
    },
    {
      id: 4,
      src: "/Museum.jpg",
      alt: "Familienbesuche",
      title: "Familienprogramm",
      description: "Spezielle Angebote für Familien mit Kindern - Geschichte für alle Generationen",
      feature: "Familienfreundlich",
      price: "Familientarife verfügbar"
    }
  ]

  return (
    <div className={`w-full ${className}`}>
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
          {bookingImages.map((image) => (
            <CarouselItem key={image.id}>
              <Card className="border-0 bg-transparent">
                <CardContent className="p-0">
                  <div className="relative w-full h-[350px] md:h-[450px] lg:h-[550px] overflow-hidden rounded-xl">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover object-center transition-transform duration-500 hover:scale-105"
                      priority={image.id === 1}
                      sizes="100vw"
                    />
                    {/* Overlay with booking info */}
                    <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 via-green-800/40 to-transparent flex items-end">
                      <div className="p-6 md:p-8 lg:p-10 text-white w-full">
                        <div className="max-w-3xl">
                          <div className="flex flex-wrap gap-2 mb-3">
                            <span className="px-3 py-1 bg-green-600 text-white text-sm font-medium rounded-full">
                              {image.feature}
                            </span>
                            <span className="px-3 py-1 bg-white/20 text-white text-sm font-medium rounded-full">
                              {image.price}
                            </span>
                          </div>
                          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 drop-shadow-lg">
                            {image.title}
                          </h3>
                          <p className="text-lg md:text-xl opacity-90 drop-shadow-md leading-relaxed">
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
        <CarouselPrevious className="left-4 bg-white/80 hover:bg-white border-0 text-gray-800 w-10 h-10" />
        <CarouselNext className="right-4 bg-white/80 hover:bg-white border-0 text-gray-800 w-10 h-10" />
      </Carousel>
    </div>
  )
}
