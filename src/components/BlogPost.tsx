"use client";

import React, { useEffect, useState } from "react";

import CardFeatured from "./atom/Card";
import { FaArrowsUpDown } from "react-icons/fa6";
import { contentfulClient } from "@/utils/contentfulClient";

export default function BlogPost() {
  const [search, setSearch] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [article, setArticle] = useState<any[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<any[]>([]); // For displaying filtered data

   // States for the date filter
  const [fromDate, setFromDate] = useState<string>("");
  const [untilDate, setUntilDate] = useState<string>("");

  const getArticles = async () => {
    try {
      const data = await contentfulClient.getEntries();
      setArticle(data.items);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategory = (category: string) => {
    setActiveCategory(category);
  };

  const filterSearchCategory = async () => {
    try {
      let filtered = article;

      if (activeCategory != "ALL") {
        filtered = filtered.filter(
          (el) => el.fields.category === activeCategory
        );
      }

      // Then filter by search term
      if (search) {
        filtered = filtered.filter((el) =>
          el.fields.title.toLowerCase().includes(search.toLowerCase())
        );
      }

      // Filter by date range
      if (fromDate) {
        filtered = filtered.filter((el) => {
          const articleDate = new Date(el.fields.date);
          return articleDate >= new Date(fromDate);
        });
      }

      if (untilDate) {
        filtered = filtered.filter((el) => {
          const articleDate = new Date(el.fields.date);
          return articleDate <= new Date(untilDate);
        });
      }

      setFilteredArticles(filtered);
    } catch (error) {
      console.log(error);
    }
  };

  const handlesearch = (input: string) => {
    setSearch(input);

    // Filter articles based on the search term
    const filtered = article.filter((el) =>
      el.fields.title.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredArticles(filtered);
  };

  const handleFromDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromDate(e.target.value);
  };

  const handleUntilDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUntilDate(e.target.value);
  };

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    filterSearchCategory(); // Trigger filtering when the form is submitted
  };

  useEffect(() => {
    getArticles();
  }, []);

  useEffect(() => {
    filterSearchCategory();
  }, [search, activeCategory, article]);

  return (
    <div className="mx-auto max-w-[80%] py-5 space-y-5">
      {/* <h1>Newest Articles</h1> */}
      <div className="flex gap-2">
        {/* sidebar */}
        <div className="min-w-[300px]">
          <p className="p-2 font-bold text-xl">Search</p>
          <hr />

          <input
            type="text"
            value={search}
            onChange={(e) => handlesearch(e.target.value)}
            placeholder="search here"
            className="mt-1 mb-5 rounded-lg w-full mx-auto p-3 m bg-white shadow-lg text-black placeholder:text-gray-600"
          />

          <p className="p-2 font-bold text-xl">Categories</p>
          <hr />
          <ul className="space-y-2 mb-5 mt-1">
            {["ALL", "SPORT", "POLITICS", "FOOD"].map((el, index) => (
              <li
                key={index}
                onClick={() => handleCategory(el)}
                className={`${
                  activeCategory == el ? "bg-gray-200" : "bg-white"
                } rounded-lg p-2 hover:cursor-pointer hover:scale-105 transition-all`}
              >
                <p>{el}</p>
              </li>
            ))}
          </ul>

          <p className="p-2 font-bold text-xl">Filter</p>
          <hr />
          <form className="mt-1" onSubmit={handleFilterSubmit}>
            <input
              type="date"
              value={fromDate}
              onChange={handleFromDateChange}
              className="mb-2 rounded-lg w-full mx-auto p-3 m bg-white shadow-lg text-black placeholder:text-gray-600 placeholder:text-xs"
              />
              <center>
                <FaArrowsUpDown />{" "}
              </center>
              <input
                type="date"
                value={untilDate}
                onChange={handleUntilDateChange}
                className="rounded-lg w-full mx-auto p-3 m bg-white shadow-lg text-black placeholder:text-gray-600 placeholder:text-xs"
              />

              <button type="submit" className="p-2 bg-blue-500 w-full text-white rounded mt-5 hover:bg-blue-600">apply</button>
          </form>
        </div>

        {/* grid articles */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((el, index) => (
              
              <CardFeatured
                key={index}
                image={el.fields.img.fields.file.url}
                title={el.fields.title}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No data found
            </div>
          )
            }
        </div>
      </div>
    </div>
  );
}
