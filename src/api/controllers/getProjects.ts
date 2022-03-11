import DataCache from '@api/cache.ts';
const { VITE_API_TOKEN } = import.meta.env;

const urlOptions = {
	headers: {
		Accept: 'application/vnd.github.v3+json',
		Authorization: `token ${VITE_API_TOKEN ?? ''}`
	}
};

const getNumPages = (link) => {
	let fragment = link.replaceAll(/[<>;]+/g, '').split(' ');
	fragment = fragment[fragment.length - 2];
	fragment = new URLSearchParams(fragment).get('page');
	return Number(fragment);
};

const queryProjects = async (url) => {
	const response = await fetch(url, urlOptions);

	let data = await response.json();

	if (data.message) {
		if (data.message.includes('rate limit') === true) {
			return {
				statusCode: 403,
				message: data.message.split(' (')[0]
			};
		}
	}

	data = await Promise.all(
		data.map(async (el) => {
			if (el.license != null) {
				el.license = el.license.name;
			} else {
				el.license = '';
			}

			const languagesRaw = await fetch(el.languages_url, urlOptions);
			el.languages = await languagesRaw.json();

			const readmeRaw = await fetch(`${el.url}/readme`, urlOptions);
			const readme = await readmeRaw.json();

			if (readme.content != null) {
				el.read_me = readme.content;
			} else {
				el.read_me = '';
			}

			const branchDataURL = new URL(el.branches_url.split('{')[0]);

			branchDataURL.searchParams.append('per_page', 1);

			const branchData = await fetch(branchDataURL, urlOptions);

			if (branchData.headers.has('link') === true) {
				const linkData = branchData.headers.get('link');

				el.branches = getNumPages(linkData);
			} else {
				el.branches = 1;
			}

			const tagDataURL = new URL(el.tags_url);

			tagDataURL.searchParams.append('per_page', 1);

			const tagData = await fetch(tagDataURL, urlOptions);

			if (tagData.headers.has('link') === true) {
				const linkData = tagData.headers.get('link');

				el.tags = getNumPages(linkData);
			} else {
				el.tags = 1;
			}

			const subscribersDataURL = new URL(el.subscribers_url);

			subscribersDataURL.searchParams.append('per_page', 1);

			const subscribersData = await fetch(subscribersDataURL, urlOptions);

			if (subscribersData.headers.has('link') === true) {
				const linkData = subscribersData.headers.get('link');

				el.subscribers_count = getNumPages(linkData);
			} else {
				el.subscribers_count = 1;
			}

			const releasesURL = new URL(el.releases_url.split('{')[0]);

			const releasesRaw = await fetch(releasesURL, urlOptions);
			let releases = await releasesRaw.json();

			releases = releases.map((el) => {
				el.body = btoa(el.body);

				return el;
			});

			el.releases = releases;

			return el;
		})
	);

	data.statusCode = 200;

	return data;
};

const projectsCache = new DataCache((url) => queryProjects(url), 60);

export const getProjects = async (req, rep) => {
	const { sort, direction } = req.params;

	const reposURL = new URL('https://api.github.com/users/Th3-S1lenc3/repos');
	reposURL.searchParams.append('sort', sort);
	reposURL.searchParams.append('direction', direction);

	const projects = await projectsCache.getData(reposURL);

	rep.code(projects.statusCode).send(projects);
};

export const getProject = async (req, rep) => {
	const { name } = req.params;
	const reposURL = new URL('https://api.github.com/users/Th3-S1lenc3/repos');

	const projects = await projectsCache.getData(reposURL);

	const project = projects.find((el) => el.name === name);

	if (typeof project === 'undefined' && projects.statusCode === 200) {
		rep.code(204).headers({ 'x-api-reason': 'No project found by that name.' });
		return;
	}

	rep.code(projects.statusCode).send(project);
};
