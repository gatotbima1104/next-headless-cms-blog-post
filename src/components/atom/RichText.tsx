import React from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Document as RichTextComponents } from '@contentful/rich-text-types'

type TRichtextProps = {
    document: RichTextComponents | undefined
}

export default function RichText({document}: TRichtextProps) {
  
    if(!document) return null
    return <>{documentToReactComponents(document)}</>
  
}
