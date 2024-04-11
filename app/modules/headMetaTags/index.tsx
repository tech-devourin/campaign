import Head from "next/head";
export default function HeadMetaTags({ title, description, image, siteName }) {

  const titleTagData = title || '';
  const descriptionTagData = description || '';
  const imageTagData = image || '';
  const siteNameTagData = siteName || '';
  const keywordsTagData = descriptionTagData + ' ' + '';

  return (
    <Head>
      {/* Coomon meta tags */}
      <title>{titleTagData}</title>
      <meta name="title" key="title" content={titleTagData} />
      <meta name="description" key="description" content={descriptionTagData} />
      <meta name="keywords" key="keywords" content={keywordsTagData}
      />

      {/* FB meta Tags */}
      <meta property="og:url" content='www.devourin.com' key="ogurl" />
      <meta property="og:site_name" content={siteNameTagData} key="ogsitename" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={titleTagData} key="ogtitle" />
      <meta property="og:description" content={descriptionTagData} key="ogdesc" />
      <meta property="og:image" content={imageTagData} key="ogimage" />

      {/* Twitter meta Tags */}
      <meta name="twitter:title" content={titleTagData} key="twittertitle" />
      <meta name="twitter:description" content={descriptionTagData} key="twitterdesc" />
      <meta name="twitter:image" content={imageTagData} key="twitterimage" />
      <meta name="twitter:site" content="Devourin Salon" key="twittersitename" />
      <meta name="twitter:creator" content="Devourin" />
      {/* application meta tags */}

      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      {/* <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no" /> */}
      <meta name="theme-color" content="#c5302a" />
      <meta name="robots" content="index, follow" />
      <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    </Head>
  );
}
