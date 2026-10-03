import Image from 'next/image'
import React from 'react'

const HeroSlider = () => {
  return (
    <div className='w-full h-full'>
        <div className=' relative w-full h-screen'>
            <Image fill src={"/images/homeBanner/1.webp"} alt='BannerImage' objectFit='cover' />    
        </div>

    </div>
  )
}

export default HeroSlider