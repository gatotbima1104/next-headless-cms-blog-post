"use client";

import React, { useEffect, useState } from "react";

import CardFeatured from "./atom/Card";
import { contentfulClient } from "@/utils/contentfulClient";
import { IContentAsset } from "@/utils/types/contentful.types";

export default function FeaturedPost() {
  const [article, setArticle] = useState<any[]>([]);

  const getArticles = async () => {
    try {
      const data = await contentfulClient.getEntries();
      setArticle(data.items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <div className="mx-auto max-w-[80%] py-5 space-y-5">
      <h1 className="text-2xl ml-2 font-bold rounded">Featured Post</h1>
      <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-2">
        {article.map((el, idx) => {
          return (
            <CardFeatured
              key={idx}
              image={(el.fields.img as IContentAsset)?.fields.file.url}
              title={el.fields.title}
            />
          );
        })}
      </div>
    </div>
  );
}
