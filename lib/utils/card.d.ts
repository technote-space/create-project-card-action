import type { Octokit } from '@technote-space/github-action-helper/dist/types';
import type { Logger } from '@technote-space/github-action-log-helper';
export declare const createCards: (columnIds: Array<number>, contentId: number, contentType: string, logger: Logger, octokit: Octokit) => Promise<{
    total: number;
    succeeded: number;
    failed: number;
}>;
