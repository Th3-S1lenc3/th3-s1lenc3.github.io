import {
	getProjects as getProjectsHandler,
	getProject as getProjectHandler
} from '@api/controllers';

import ProjectSchema from '@api/options/schemas/ProjectSchema.ts';
import { String } from './schemas/Types.ts';

export const getProjects = {
	schema: {
		response: {
			200: {
				type: 'array',
				items: ProjectSchema
			},
			403: {
				type: 'object',
				properties: {
					message: String
				}
			}
		}
	},
	handler: getProjectsHandler
};

export const getProject = {
	schema: {
		response: {
			200: ProjectSchema,
			204: {
				type: 'object',
				properties: {
					message: String
				}
			},
			403: {
				type: 'object',
				properties: {
					message: String
				}
			}
		}
	},
	handler: getProjectHandler
};
