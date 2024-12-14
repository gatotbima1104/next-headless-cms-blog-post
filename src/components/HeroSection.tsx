'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { contentfulClient } from '@/utils/contentfulClient'
import RichText from './atom/RichText'
import Link from 'next/link'

export default function HeroSection() {

  const [mainArtcile, setMainArticle] = useState<any | null>(null)

  const fetchMainArtcle = async () => {
    try {
      const data = await contentfulClient.getEntries()

      if (data.items.length > 0) {
        setMainArticle(data.items[0].fields); // Access fields directly
      } else {
        console.log("Article not found.");
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchMainArtcle()
  }, [])

  // Check if mainArtcile is loaded before rendering
  if (!mainArtcile) {
    return (
      <div className='bg-[url("/bg.jpeg")] mx-auto min-h-[50vh] bg-no-repeat w-full'>
        <div className='flex w-[80%] lg:flex-row sm:flex-col items-center mx-auto p-2 gap-5 sm:pt-10 lg:pt-2'>
          <p className="text-white">Loading...</p>
        </div>
      </div>
    )
  }


  return (
    <div className='bg-[url("/bg.jpeg")] mx-auto min-h-[50vh] bg-no-repeat w-full'>
      <div className='flex w-[90%] lg:flex-row sm:flex-col items-center mx-auto p-2 gap-5 sm:pt-10 lg:pt-2 pb-5'>
        {/* Ensure mainArtcile.image is valid and present */}
        {mainArtcile.img && (
          <Link href={`blog/${mainArtcile.slug}`}>
            <Image 
              src={`https://${mainArtcile.img.fields.file.url}`} 
              alt='article' 
              className='rounded sm:w-[300px] sm:h-[250px] lg:w-[2000px] lg:h-[400px] hover:scale-105 transition-all cursor-pointer' 
              width={1000} 
              height={100} 
            />
          </Link>
        )}
        <div className='space-y-5'>
          <h1 className='pt-5 font-bold lg:text-3xl sm:text-xl'>
            {mainArtcile.title}
          </h1>
            <RichText document={
              mainArtcile.content
            }/>
        </div>
      </div>
    </div>
  )
}
