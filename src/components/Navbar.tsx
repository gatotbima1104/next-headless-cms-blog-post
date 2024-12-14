'use client';

import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { CgMenuLeftAlt } from 'react-icons/cg'

import Logo from "../../public/logo.jpg"
import Link from 'next/link';

export default function Navbar() {

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isActive, setIsActive] = useState<string>("home")
  const isClickedMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleNavbarActive = (label: string) => {
    setIsActive(label)
  }

    // close burger when lg automatically
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth >= 1024) {
          setIsOpen(false);
        }
      };
  
      // Add event listener on window resize
      window.addEventListener("resize", handleResize);
  
      // Cleanup event listener on component unmount
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

  return (
    
    <nav className='w-full bg-white h-[100px] text-black shadow-lg font-bold flex sm:justify-between lg:justify-between items-center sm:px-20 lg:px-32 font-geist-mono sticky top-0 z-10'>
        <Image alt='logo' src={Logo} width={80} height={50}/>
        <ul className='lg:flex gap-10 hidden items-center'>
          {
            [
              {id: "home", label: "Home", link: "/"},
              {id: "blog", label: "Blog Post", link: "/blog"},
              {id: "categories", label: "Categories", link: "/categories"},
              {id: "about", label: "About", link: "/about"},
            ].map((el, idx) => {
              return (
                <li
                  key={idx}
                  onClick={() => handleNavbarActive(el.id)}
                  className={`cursor-pointer p-2 rounded-xl ${
                    isActive === el.id ? "bg-gray-200" : "hover:bg-gray-200"
                  }`}
                >
                  <Link href={el.link}>
                    {el.label}
                  </Link>
                </li>
              )
            })
          }
        </ul>


        <button className='lg:hidden' onClick={isClickedMenu}> 
          <CgMenuLeftAlt size={30}/>
        </button>

        <ul className={`${isOpen? 'block': 'hidden'} absolute w-full min-h-screen bg-white text-black left-0 top-24 grid grid-rows-6 items-center justify-start pl-20 gap-10`}>
            <li className='hover:text-[#59E3C6] text-3xl'><Link href="/">Home</Link></li>
            <li className='hover:text-[#59E3C6] text-3xl'><Link href="/categories">Categories</Link></li>
            <li className='hover:text-[#59E3C6] text-3xl'><Link href="/blog">Blog</Link></li>
            <li className='hover:text-[#59E3C6] text-3xl'><Link href="/about">About</Link></li>
        </ul>
    </nav>
    

  )
}
