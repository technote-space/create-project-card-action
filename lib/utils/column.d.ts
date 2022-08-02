import type { Octokit } from '@technote-space/github-action-helper/dist/types';
export declare const getColumnIds: (projectIds: Array<number>, columnName: string, octokit: Octokit) => Promise<Array<number>>;
