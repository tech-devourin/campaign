import React, { useEffect } from 'react'
import HeadMetaTags from '@module/headMetaTags';
import { windowRef } from 'app/service/window';
import { DEFAULT_TITLE_METATAG, DEFAULT_DESCRIPTION_METATAG, DEFAULT_IMAGE_METATAG, DEFAULT_SITENAME_METATAG } from "@constant/defaultValues";

export default function Home() {
  const metaTags = {
    title: DEFAULT_TITLE_METATAG,
    description: DEFAULT_DESCRIPTION_METATAG,
    image: DEFAULT_IMAGE_METATAG,
    siteName: DEFAULT_SITENAME_METATAG,
  }
  useEffect(() => {
    if (windowRef) {
      window.location.href = 'https://devourin.com';
    }
  }, [windowRef])

  return (
    <div>
      <HeadMetaTags {...metaTags} />
    </div>
  )
}
