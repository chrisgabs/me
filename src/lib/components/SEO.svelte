<script lang="ts">
  // Props for the SEO component
  export let title: string = 'Christian Bayquen';
  export let description: string = 'Welcome to my personal website! Dive into a self-documentation of my career, where I showcase my personal projects, share insights from my professional endeavors, and express my thoughts through articles on various topics.';
  export let keywords: string = 'Christian Bayquen, developer, portfolio, projects, technology, innovation';
  export let image: string = 'https://cbayquen.com/og.png';
  export let type: string = 'website';
  export let url: string = 'https://cbayquen.com';
  export let canonical: string = '';
  export let publishedTime: string = '';
  export let modifiedTime: string = '';
  
  // If canonical URL isn't provided, use the current URL
  $: canonicalUrl = canonical || url;
</script>

<svelte:head>
  <!-- Basic Meta Tags -->
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta name="keywords" content={keywords} />

  <!-- Canonical URL -->
  <link rel="canonical" href={canonicalUrl} />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content={type} />
  <meta property="og:url" content={url} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={image} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="627" />
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content={url} />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={image} />
  
  <!-- Article specific tags (if applicable) -->
  {#if type === 'article' && publishedTime}
    <meta property="article:published_time" content={publishedTime} />
  {/if}
  
  {#if type === 'article' && modifiedTime}
    <meta property="article:modified_time" content={modifiedTime} />
  {/if}
  
  <!-- Schema.org structured data for LLM crawlers -->
  <script type="application/ld+json">
  {
    JSON.stringify({
      "@context": "https://schema.org",
      "@type": type === 'article' ? 'Article' : 'WebPage',
      "headline": title,
      "description": description,
      "image": image,
      "url": url,
      ...(type === 'article' && publishedTime ? {
        "datePublished": publishedTime,
        "dateModified": modifiedTime || publishedTime
      } : {}),
      "author": {
        "@type": "Person",
        "name": "Christian Bayquen"
      }
    })
  }
  </script>
</svelte:head> 