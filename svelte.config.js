import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { mdsvex } from "mdsvex";

const config = {
  extensions: ['.svelte', '.md'],

  preprocess: [
    vitePreprocess(),
    mdsvex({
      extensions: ['.md']
    })
  ],

  kit: {
    adapter: adapter(),
    alias: {
      $lib: "./src/lib",
    },
  },
};

export default config;