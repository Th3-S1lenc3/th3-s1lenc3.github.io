import { String, Number } from './Types.ts';

export default {
	type: 'object',
	properties: {
		id: Number,
		name: String,
		body: String,
		html_url: String,
		published_at: String
	}
};
