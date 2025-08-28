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
import Link from 'next/link'

interface DashboardCarouselProps {
  className?: string
}

export default function DashboardCarousel({ className = "" }: DashboardCarouselProps) {
  const dashboardImages = [
    {
      id: 1,
      src: "/Museum.jpg",
      alt: "Willkommen zurück im Museum",
      title: "Willkommen zurück!",
      description: "Ihre nächste Entdeckungsreise wartet auf Sie",
      action: "Neue Buchung",
      link: "/events"
    },
    {
      id: 2,
      src: "/Museum1.jpg",
      alt: "Entdecken Sie neue Ausstellungen",
      title: "Neue Ausstellungen",
      description: "Verpassen Sie nicht unsere aktuellen Sonderausstellungen",
      action: "Jetzt entdecken",
      link: "/exhibitions"
    },
    {
      id: 3,
      src: "/Museum2.jpg",
      alt: "Ihre Buchungshistorie",
      title: "Ihre Besuche",
      description: "Überblick über all Ihre Museumsbesuche und Buchungen",
      action: "Buchungen ansehen",
      link: "/bookings"
    },
    {
      id: 4,
      src: "/Museum.jpg",
      alt: "Profil verwalten",
      title: "Ihr Profil",
      description: "Verwalten Sie Ihre persönlichen Daten und Präferenzen",
      action: "Profil bearbeiten",
      link: "/profile"
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
          {dashboardImages.map((image) => (
            <CarouselItem key={image.id}>
              <Card className="border-0 bg-transparent">
                <CardContent className="p-0">
                  <div className="relative w-full h-[280px] overflow-hidden rounded-lg group cursor-pointer">
                    <Link href={image.link}>
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
                        priority={image.id === 1}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {/* Overlay with dashboard info */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex items-end">
                        <div className="p-4 text-white w-full">
                          <div className="mb-2">
                            <span className="px-2 py-1 bg-blue-600/80 text-white text-xs font-medium rounded-full">
                              {image.action}
                            </span>
                          </div>
                          <h4 className="text-lg md:text-xl font-bold mb-1 drop-shadow-lg">
                            {image.title}
                          </h4>
                          <p className="text-sm md:text-base opacity-90 drop-shadow-md">
                            {image.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 bg-white/80 hover:bg-white/90 border-0 text-gray-800 w-8 h-8 z-10 shadow-md" />
        <CarouselNext className="right-2 bg-white/80 hover:bg-white/90 border-0 text-gray-800 w-8 h-8 z-10 shadow-md" />
      </Carousel>
    </div>
  )
}
