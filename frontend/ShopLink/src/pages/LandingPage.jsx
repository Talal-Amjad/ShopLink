import React from 'react'
import NavBar from '../components/LandingPageComponents/NavBar'
import HeroSection from '../components/LandingPageComponents/HeroSection'
import AboutUS from '../components/LandingPageComponents/AboutUS'
import Services from '../components/LandingPageComponents/Services'
import Team from '../components/LandingPageComponents/Team'
import Footer from '../components/LandingPageComponents/Footer'
export default function LandingPage() {
  return (
    <>
        <NavBar/>
        <HeroSection/>
        <AboutUS/>
        <Services/>
        <Team/>
        <Footer/>
   </>
  )
}
