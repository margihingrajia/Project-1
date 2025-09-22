import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import adapter from '@sveltejs/adapter-static';

const dev = process.argv.includes('dev');


/** @type {import("@sveltejs/vite-plugin-svelte").SvelteConfig} */
export default {
  // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
  // for more information about preprocessors
  preprocess: vitePreprocess(),

    kit: {
    adapter: adapter(),
    paths: {
      // 👇 replace USERNAME and REPO with your GitHub username & repo name
      base: dev ? '' : '/Project-1',
    }
  }
}


