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

interface SmallCarouselProps {
  className?: string
  showNavigation?: boolean
  autoplay?: boolean
}

export default function SmallMuseumCarousel({ 
  className = "", 
  showNavigation = true,
  autoplay = true 
}: SmallCarouselProps) {
  const museumHighlights = [
    {
      id: 1,
      src: "/Museum.jpg",
      alt: "Museum Ernsthausen - Eingangsbereich",
      title: "Herzlich Willkommen",
      description: "Treten Sie ein in unsere Welt der Geschichte"
    },
    {
      id: 2,
      src: "/Museum1.jpg",
      alt: "Museum Ernsthausen - Ausstellungsraum",
      title: "Faszinierende Exponate",
      description: "Entdecken Sie einzigartige Sammlerstücke"
    },
    {
      id: 3,
      src: "/Museum2.jpg",
      alt: "Museum Ernsthausen - Interaktiver Bereich",
      title: "Zum Anfassen",
      description: "Geschichte hautnah erleben"
    },
    {
      id: 4,
      src: "/Museum.jpg",
      alt: "Museum Ernsthausen - Bildung",
      title: "Lernen & Entdecken",
      description: "Bildung durch Erfahrung"
    },
    {
      id: 5,
      src: "/Museum1.jpg",
      alt: "Museum Ernsthausen - Tradition",
      title: "Lebendige Tradition",
      description: "Vergangenheit trifft Gegenwart"
    }
  ]

  const plugins = autoplay ? [Autoplay({ delay: 3500 })] : []

  return (
    <div className={`w-full ${className}`}>
      <Carousel 
        className="w-full"
        plugins={plugins}
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {museumHighlights.map((image) => (
            <CarouselItem key={image.id}>
              <Card className="border-0 bg-transparent">
                <CardContent className="p-0">
                  <div className="relative w-full h-[250px] md:h-[300px] overflow-hidden rounded-lg">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover object-center transition-transform duration-300 hover:scale-105"
                      priority={image.id === 1}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Overlay with text */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end">
                      <div className="p-4 text-white w-full">
                        <h4 className="text-lg md:text-xl font-bold mb-1 drop-shadow-lg">
                          {image.title}
                        </h4>
                        <p className="text-sm md:text-base opacity-90 drop-shadow-md">
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
        {showNavigation && (
          <>
            <CarouselPrevious className="left-2 bg-white/60 hover:bg-white/80 border-0 text-gray-800 w-8 h-8" />
            <CarouselNext className="right-2 bg-white/60 hover:bg-white/80 border-0 text-gray-800 w-8 h-8" />
          </>
        )}
      </Carousel>
    </div>
  )
}
