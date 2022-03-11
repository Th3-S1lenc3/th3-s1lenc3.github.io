import * as Server from '@api/server.js';

export async function handle({ event, resolve }): Response {
	// route all requests to fastify if they have the /api prefix
	if (event.url.pathname.startsWith('/api')) {
		const server = await Server.init();
		const response = await server.inject({
			method: 'GET',
			url: event.url.pathname,
			query: event.url.searchParams,
			payload: event.payload,
			headers: event.request.headers
		});

		return new Response(response.body, {
			status: response.statusCode,
			statusText: response.statusMessage,
			headers: response.headers
		});
	}

	const response = await resolve(event);
	return response;
}
