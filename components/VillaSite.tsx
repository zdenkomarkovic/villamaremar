'use client'

import Navbar from './Navbar'
import Hero from './Hero'
import About from './About'
import Rooms from './Rooms'
import Amenities from './Amenities'
import Gallery from './Gallery'
import Videos from './Videos'
import Location from './Location'
import Info from './Info'
import Contact from './Contact'
import Footer from './Footer'
import type { Room } from '@/types/room'

interface Props {
  rooms: Room[]
}

export default function VillaSite({ rooms }: Props) {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Rooms rooms={rooms} />
        <Amenities />
        <Gallery />
        <Videos />
        <Location />
        <Info />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
