import React from 'react'
import HeroSection from '../components/HeroSection'
import CategorySection from '../components/Categories'
import FeaturedProjects from '../components/FeaturedProjects'

const Home = () => {
  return (
    <div className="w-full bg-[#0A0A0A]">
        <HeroSection/>
        <CategorySection />
        <FeaturedProjects />
    </div>
  )
}

export default Home