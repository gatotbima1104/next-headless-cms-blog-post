import { createClient } from "contentful";

const space = process.env.NEXT_PUBLIC_SPACE_ID || '';
const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN || '';

export const contentfulClient = createClient({
    space,
    accessToken
})