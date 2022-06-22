import type { Context } from '@actions/github/lib/context';
import type { Octokit } from '@technote-space/github-action-helper/dist/types';
import { isActive } from './misc';

// eslint-disable-next-line camelcase
export const getRepoProject = async(projectName: string, octokit: Octokit, context: Context): Promise<number | undefined> => context.payload.repository?.has_projects ? (await octokit.paginate(
  octokit.rest.projects.listForRepo,
  { ...context.repo, state: 'open' },
)).find(item => item.name === projectName)?.id : undefined;

export const getOrgProject = async(projectName: string, octokit: Octokit, context: Context): Promise<number | undefined> => isActive('ORG') && 'organization' in context.payload ? (await octokit.paginate(
  octokit.rest.projects.listForOrg,
  { org: context.repo.owner, state: 'open' },
)).find(item => item.name === projectName)?.id : undefined;

export const getUserProject = async(projectName: string, octokit: Octokit, context: Context): Promise<number | undefined> => isActive('USER') && !('organization' in context.payload) ? (await octokit.paginate(
  octokit.rest.projects.listForUser,
  { username: context.repo.owner, state: 'open' },
)).find(item => item.name === projectName)?.id : undefined;

export const getProjectIds = async(projectName: string, octokit: Octokit, context: Context): Promise<Array<number>> => {
  const projectIds: Array<number> = [];
  for (const generator of [getRepoProject, getOrgProject, getUserProject]) {
    const projectId = await generator(projectName, octokit, context);
    if (undefined !== projectId) {
      projectIds.push(projectId);
    }
  }

  return projectIds;
};
