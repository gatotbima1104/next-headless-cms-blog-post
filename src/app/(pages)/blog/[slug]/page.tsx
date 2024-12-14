'use client'

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { contentfulClient } from "@/utils/contentfulClient";
import { TypeBlogPostSkeleton } from "@/utils/types/contentful.types";

import RichText from "@/components/atom/RichText";

export default function Page() {
  const [article, setArticle] = useState<any | null>(null);
  const params = useParams<{ slug: string }>();

  const fetchArticle = async () => {
    try {
      const data = await contentfulClient.getEntries<TypeBlogPostSkeleton>({
        content_type: 'blogPost',
        limit: 1,
        'fields.slug[match]': params.slug,
      });

      if (data.items.length > 0) {
        setArticle(data.items[0].fields); // Access fields directly
      } else {
        console.log("Article not found.");
      }
    } catch (error) {
      console.error("Error fetching article:", error);
    }
  };

  useEffect(() => {
    fetchArticle();
  }, [params.slug]);

  if (!article) {
    return (
      <div className="w-[80%] mx-auto flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  const date = new Date(article.createdAt).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="w-[80%] mx-auto flex min-h-screen items-center flex-col px-5 py-10 gap-5">
      <h1 className="font-bold text-3xl">{article.title}</h1>
      <p className="text-xs italic">{ date }</p>
      <Image alt="news-1" src={`https://${article.img.fields.file.url}`} className="rounded-lg" width={900} height={900} />

      <h3 className="w-[80%] text-justify">
        <RichText document={article.content}/>
      </h3>
    </div>
  );
}
