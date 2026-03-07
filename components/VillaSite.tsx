'use client'

import Navbar from './Navbar'
import Hero from './Hero'
import About from './About'
import Rooms from './Rooms'
import Pricing from './Pricing'
import Amenities from './Amenities'
import Gallery from './Gallery'
import Videos from './Videos'
import Location from './Location'
import Info from './Info'
import Contact from './Contact'
import Footer from './Footer'
import type { Room } from '@/types/room'
import type { Cenovnik } from '@/types/pricing'
import type { GalleryImage } from '@/types/galleryImage'

interface Props {
  rooms: Room[]
  cenovnik: Cenovnik | null
  sanityGallery: GalleryImage[]
}

export default function VillaSite({ rooms, cenovnik, sanityGallery }: Props) {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        {/* <Rooms rooms={rooms} /> */}
        <Pricing cenovnik={cenovnik} />
        <Amenities />
        <Gallery sanityImages={sanityGallery} />
        <Videos />
        <Location />
        <Info />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
