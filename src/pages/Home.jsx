import React, { useEffect } from 'react'
import HeroSection from '../components/HeroSection'
import FeaturedProjects from '../components/FeaturedProjects'
import AboutUs from '../components/AboutUS'
import ServicesSection from '../components/ServiceSection'
import OnePhotoSection from '../components/OnePhotoSection'
import TestimonialsSection from '../components/Testimonials'
import InstagramFeed from '../components/InstaFeed'
import CallToAction from '../components/CallToAction'


const Home = () => {
  useEffect(() => {
    // (x-coord, y-coord)
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="w-full bg-[#0A0A0A]">
      <HeroSection />
      <FeaturedProjects />
      <AboutUs />
      <ServicesSection />
      <OnePhotoSection />
      <TestimonialsSection />
      <InstagramFeed />
      <CallToAction />
    </div>
  )
}

export default Home