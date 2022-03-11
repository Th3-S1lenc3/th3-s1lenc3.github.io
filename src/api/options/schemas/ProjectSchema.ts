import { String, Number } from './Types.ts';
import ReleaseSchema from './ReleaseSchema.ts';

export default {
	type: 'object',
	properties: {
		name: String,
		html_url: String,
		description: String,
		created_at: String,
		pushed_at: String,
		license: String,
		language: String,
		languages: {},
		read_me: String,
		branches: Number,
		tags: Number,
		forks: Number,
		open_issues: Number,
		watchers: Number,
		subscribers_count: Number,
		releases: {
			type: 'array',
			items: ReleaseSchema
		}
	}
};
