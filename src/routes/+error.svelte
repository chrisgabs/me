<script lang="ts">
  import { page } from '$app/stores';
  import SEO from '$lib/components/SEO.svelte';
</script>

<SEO 
  title="Page Not Found - Christian Bayquen"
  description="Sorry, the page you are looking for does not exist."
  type="website"
  url="https://cbayquen.com"
/>

<div class="flex flex-col items-center justify-center h-screen px-4 text-center">
  <h1 class="text-4xl font-bold mb-4">{$page.status}: {$page.error?.message || 'Not Found'}</h1>
  
  <p class="text-lg mb-8">Sorry, the page you're looking for doesn't exist.</p>
  
  <a href="/" class="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition">
    Return Home
  </a>
</div> 