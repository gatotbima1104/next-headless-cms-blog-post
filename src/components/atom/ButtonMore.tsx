import Link from 'next/link'
import React from 'react'

export default function ButtonMore({text, link}: {text: string, link: string}) {
  return (
    <Link href={link}>
      <button className="border text-sm p-2 hover:bg-blue-500 rounded-xl bg-blue-400 text-white">{text}</button>
    </Link>
  )
}
