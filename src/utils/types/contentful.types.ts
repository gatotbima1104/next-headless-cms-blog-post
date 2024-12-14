import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";

export interface TypeBlogPostFields {
  title: EntryFieldTypes.Symbol;
  slug?: EntryFieldTypes.Symbol;
  content: EntryFieldTypes.RichText;
  img: EntryFieldTypes.AssetLink;
}

export interface IContentAsset {
    sys: {},
    fields: {
        file: {
          url: string
          details?: any
          filename?: string
          contentType?: string
        }
        
    }
}
export type TypeBlogPostSkeleton = EntrySkeletonType<
  TypeBlogPostFields,
  "blogPost"
>;
export type TypeBlogPost<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode
> = Entry<TypeBlogPostSkeleton, Modifiers, Locales>;
