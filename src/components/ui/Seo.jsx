/**
 * React 19 hoists <title>/<meta>/<link> tags rendered anywhere in the tree
 * into the document <head> automatically — no portal or extra library
 * needed. Drop this at the top of a page component to set that page's
 * search-result title/description and link-preview (Open Graph) tags.
 */
const Seo = ({ title, description, image, noindex = false }) => {
  const fullTitle = title ? `${title} | Edhi Foundation` : 'Edhi Foundation — Serving Humanity Since 1951'

  return (
    <>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}

      <meta property="og:site_name" content="Edhi Foundation" />
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:type" content="website" />
      {image && <meta property="og:image" content={image} />}

      <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      {image && <meta name="twitter:image" content={image} />}

      {noindex && <meta name="robots" content="noindex, nofollow" />}
    </>
  )
}

export default Seo
