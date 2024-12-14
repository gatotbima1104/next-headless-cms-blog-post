"use client";

import React, { useEffect, useState } from "react";

import CardFeatured from "./atom/Card";
import { contentfulClient } from "@/utils/contentfulClient";
import ButtonMore from "./atom/ButtonMore";

export default function PopularPost() {
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

  const sortedArticles = [...article].sort((a, b) => b.fields.views - a.fields.views);
  return (
    <div className="mx-auto max-w-[80%] py-5 space-y-5">
      <h1 className="text-2xl ml-2 font-bold rounded">Popular Post</h1>
      <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-2">
        {sortedArticles.map((el, idx) => {
          return (
            <CardFeatured
              key={idx}
              image={el.fields.img.fields.file.url}
              title={el.fields.title}
            />
          );
        })}
      </div>

      <center>
        <ButtonMore link="/blog" text="Read More"/>
      </center>
    </div>
  );
}
