import { GitHub } from '@actions/github/lib/github';
import { Context } from '@actions/github/lib/context';
import Octokit from '@octokit/rest';
import { Logger } from '@technote-space/github-action-helper';
import { isActive, search } from './misc';

// eslint-disable-next-line camelcase
export const getRepoProject = async(projectName: string, logger: Logger, octokit: GitHub, context: Context): Promise<number | undefined> => context.payload.repository?.has_projects ? search<Octokit.ProjectsListForRepoResponseItem, number>(
	async(page: number) => (await octokit.projects.listForRepo({owner: context.repo.owner, repo: context.repo.repo, state: 'open', page})).data,
	item => item.name === projectName,
	item => item.id,
	logger,
) : undefined;

export const getOrgProject = async(projectName: string, logger: Logger, octokit: GitHub, context: Context): Promise<number | undefined> => isActive('ORG') && 'organization' in context.payload ? search<Octokit.ProjectsListForOrgResponseItem, number>(
	async(page: number) => (await octokit.projects.listForOrg({org: context.repo.owner, state: 'open', page})).data,
	item => item.name === projectName,
	item => item.id,
	logger,
) : undefined;

export const getUserProject = async(projectName: string, logger: Logger, octokit: GitHub, context: Context): Promise<number | undefined> => isActive('USER') && !('organization' in context.payload) ? search<Octokit.ProjectsListForUserResponseItem, number>(
	async(page: number) => (await octokit.projects.listForUser({username: context.repo.owner, state: 'open', page})).data,
	item => item.name === projectName,
	item => item.id,
	logger,
) : undefined;

export const getProjectIds = async(projectName: string, logger: Logger, octokit: GitHub, context: Context): Promise<Array<number>> => {
	const projectIds: Array<number> = [];
	for (const generator of [getRepoProject, getOrgProject, getUserProject]) {
		const projectId = await generator(projectName, logger, octokit, context);
		if (undefined !== projectId) {
			projectIds.push(projectId);
		}
	}

	return projectIds;
};
