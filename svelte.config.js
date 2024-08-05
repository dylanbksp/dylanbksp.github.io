import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		preprocess: vitePreprocess(),
		adapter: adapter({
			// fallback: '404.html'   NOTE: Add this later.
		}),
		paths: {
			base: process.env.NODE_ENV === 'production' ? '/bkspwebsite' : '',
		}
	}
};

export default config;