import adapter from '@sveltejs/adapter-auto';
import sveltePreprocess from 'svelte-preprocess';
import * as sass from 'sass';
import tailwind from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default {
	kit: {
		adapter: adapter()
	},
	preprocess: sveltePreprocess({
    sass: {
      sync: true,
      implementation: sass,
    },
		postcss: {
			plugins: [
				tailwind,
				autoprefixer,
			],
		},
  }),
};
