import Fastify from 'fastify';
import Swagger from 'fastify-swagger';

import routes from '@api/routes';

export async function init() {
	const fastify = Fastify({ logger: true });

	fastify.register(Swagger, {
		exposeRoute: true,
		routePrefix: '/api/docs',
		swagger: {
			info: {
				title: 'th3-s1lenc3-api'
			}
		}
	});

	routes.forEach((route) => {
		fastify.register(route, { prefix: '/api' });
	});

	fastify.get('/api/health', (req, rep) => {
		rep.send({ status: 'ok' });
	});

	return fastify;
}
