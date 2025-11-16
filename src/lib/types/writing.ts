import type { SvelteComponent } from 'svelte';

// src/routes/writing/[slug]/+page.ts
export type PostData = {
    title: string;
    date: string;
    description: string;
    content: typeof SvelteComponent;
};