<script lang="ts">
  export let title: string;
  export let description: string;
  export let url: string = 'https://cbayquen.com/projects';
  export let imageUrl: string = '';
  export let datePublished: string = new Date().toISOString().split('T')[0];
  export let technologies: string[] = [];
  export let githubUrl: string = '';
  export let demoUrl: string = '';
</script>

<svelte:head>
  <script type="application/ld+json">
  {
    JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareSourceCode",
      "name": title,
      "description": description,
      "codeRepository": githubUrl || null,
      "url": url,
      "datePublished": datePublished,
      "programmingLanguage": {
        "@type": "ComputerLanguage",
        "name": technologies.join(", ")
      },
      "image": imageUrl || null,
      "author": {
        "@type": "Person",
        "name": "Christian Bayquen",
        "url": "https://cbayquen.com"
      },
      ...(demoUrl ? {
        "potentialAction": {
          "@type": "ViewAction",
          "target": demoUrl
        }
      } : {})
    })
  }
  </script>
</svelte:head> 