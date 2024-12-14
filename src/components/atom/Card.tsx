'use client'

import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

import { generateSlug } from "@/utils/slug";

interface ICardFeatured {
    image: StaticImageData | string
    title: string
}

export default function CardFeatured(card: ICardFeatured) {

  const slug = generateSlug(card.title)
  const imageUrl =
  typeof card.image === "string" && card.image.startsWith("//")
    ? `https:${card.image}`
    : card.image;

  return (
    <Link href={`/blog/${slug}`}>
      <div className="p-2 flex flex-col gap-2 hover:cursor-pointer">
        <Image
          width={100}
          height={100}
          src={imageUrl}
          alt={card.title}
          className="rounded-lg w-full h-[150px] object-cover transition-all hover:scale-105"
        />
        <h2>{card.title}</h2>
      </div>
    </Link>
  );
}
