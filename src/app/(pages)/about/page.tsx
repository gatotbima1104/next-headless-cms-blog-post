import Photo from "../../../../public/profile_photo.jpeg"
import Image from 'next/image'
import React from 'react'

export default function page() {
  return (
      <div className="mx-auto max-w-[50%] py-5 space-y-10">
        <div className='space-y-5'>
          <h1 className='text-xl font-bold sm:text-center lg:text-start'>History</h1>
          <p>This blog was created to help readers read the latest news related to several available categories. I was also helped in improving my website creation skills, in order to expand my portfolio and follow the available market.</p>
        </div>

        <div className='space-y-5'>
          <h1 className='text-xl font-bold sm:text-center lg:text-start'>Author</h1>
          <div className="flex sm:flex-col lg:flex-row gap-5 sm:items-center">
            <Image alt='photo-author' src={Photo} width={200} height={200} className="rounded-lg hover:scale-105 cursor-pointer"/>
            <div className="flex flex-col justify-center sm:space-y-5 lg:space-y-2 sm:text-center lg:text-start">
              <h1 className="font-bold text-xl">Muhamad Gatot Supiadin</h1>
              <p>Software Engineer experienced in Web Scraping for over 2+ years</p>
              <p>Interesting in Software Engineer, Automation & Data Engineer</p>
            </div>
          </div>

        </div>

        <div className='space-y-5'>
          <h1 className='text-xl font-bold sm:text-center lg:text-start'>Vision & Mision</h1>
          <ul>
            <li><p>- Presenting readers with the latest news related to the available categories</p></li>
            <li><p>- Helping readers follow current developments in the world</p></li>
            <li><p>- Launching the products I produce for future website creation</p></li>
          </ul>
        </div>

        <div className='space-y-5'>
          <h1 className='text-xl font-bold sm:text-center lg:text-start'>Contact</h1>
          <p>If you like this website and want to collaborate with the creator, you can contact me via emial <a href="mailto:gatotbima2002@gmail.com" className='underline italic text-blue-400 hover:text-blue-500'>gatotbima@gmail.com</a>. I am very open to collaborating part time or full time.</p>
        </div>
      </div>
  )
}