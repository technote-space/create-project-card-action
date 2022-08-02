import type { Context } from '@actions/github/lib/context';
import type { Octokit } from '@technote-space/github-action-helper/dist/types';
export declare const getRepoProject: (projectName: string, octokit: Octokit, context: Context) => Promise<number | undefined>;
export declare const getOrgProject: (projectName: string, octokit: Octokit, context: Context) => Promise<number | undefined>;
export declare const getUserProject: (projectName: string, octokit: Octokit, context: Context) => Promise<number | undefined>;
export declare const getProjectIds: (projectName: string, octokit: Octokit, context: Context) => Promise<Array<number>>;
