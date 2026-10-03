import React from 'react'
  import HeroSlider from '@/components/home/HeroSlider'
import CategoryGrid from '@/components/home/CategoryGrid'
import SectionHeader from '@/components/home/SectionHeader'
import ShopByCollection from '@/components/home/ShopByCollection'
import InstagramFeed from '@/components/home/InstagramFeed'
import Footer from '@/components/layout/Footer'

const page = () => {
  return (
    <div className='min-h-screen w-full flex flex-col'>
    <HeroSlider />

    <SectionHeader title={"Categories"} subtitle={"Explore all categories"} />
    <CategoryGrid />

    <ShopByCollection />

    <InstagramFeed />

    <Footer />
    </div>
  )
}

export default page