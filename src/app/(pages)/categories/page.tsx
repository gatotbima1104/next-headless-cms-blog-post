import React from "react";
import CategoryList from "@/components/layout/CategoriesList";
import { ECategories } from "@/utils/categories.enum";

export default function page() {
  return (
  <div>
    <CategoryList title="Politics" category={ECategories.POLITICS}/>
    <CategoryList title="Food" category={ECategories.FOOD}/>
    <CategoryList title="Sport" category={ECategories.SPORT}/>
    <CategoryList title="Technology" category={ECategories.TECHNOLOGY}/>
  </div>
  );
}
