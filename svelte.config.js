import sveltePreprocess from 'svelte-preprocess';
import * as sass from 'sass';
import tailwind from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import path from 'path';
import node from '@sveltejs/adapter-node';

export default {
	kit: {
		adapter: node(),
		vite: {
			resolve: {
				alias: {
					'@components': path.resolve('./src/lib/components'),
					'@lib': path.resolve('./src/lib'),
					'@api': path.resolve('./src/api')
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
