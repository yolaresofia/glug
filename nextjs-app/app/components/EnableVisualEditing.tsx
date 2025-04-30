'use client'

import { useEffect } from 'react'
import { enableVisualEditing } from '@sanity/visual-editing'

export default function EnableVisualEditing() {
  useEffect(() => {
    enableVisualEditing()
  }, [])

  return null
}
