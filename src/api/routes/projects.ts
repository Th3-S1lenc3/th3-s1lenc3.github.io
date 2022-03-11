import { getProjects, getProject } from '@api/options';

export const projectsRoutes = (fastify, options, done) => {
	fastify.get('/projects/:sort/:direction', getProjects);
	fastify.get('/project/:name', getProject);

	done();
};
