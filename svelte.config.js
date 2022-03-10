import adapter from '@sveltejs/adapter-auto';
import sveltePreprocess from 'svelte-preprocess';
import * as sass from 'sass';
import tailwind from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import path from 'path';

export default {
	kit: {
		adapter: adapter(),
		vite: {
			resolve: {
				alias: {
					'@components': path.resolve('./src/lib/components'),
					'@lib': path.resolve('./src/lib')
				}
			}
		}
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
