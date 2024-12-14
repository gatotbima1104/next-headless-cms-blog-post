'use client'

import React, { useEffect, useState } from 'react'
import { contentfulClient } from '@/utils/contentfulClient'
import CardFeatured from '../atom/Card'
import { ECategories } from '@/utils/categories.enum'

interface ICardList {
  title: string
  category?: ECategories
}

export default function CategoriesList({title, category}: ICardList) {

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

  const filteredCategory = category ? article.filter((el) => el.fields.category?.trim().toUpperCase() === category?.toUpperCase()) : []

  return (
    <div className="mx-auto max-w-[80%] py-5 space-y-5">
      <center>
        <h1 className='text-xl ml-2 font-bold p-2 shadow-md rounded'>{title}</h1>
      </center>
    <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-2">
      {
        filteredCategory.map((el, idx) => (
          <CardFeatured key={idx} image={el.fields.img.fields.file.url} title={el.fields.title}/>
        ))
      }
    </div>
  </div>
  )
}
