import { Context } from '@actions/github/lib/context';
import { ContextHelper } from '@technote-space/github-action-helper';

// eslint-disable-next-line no-magic-numbers
export const getContentId = (context: Context): number => (ContextHelper.isPr(context) ? context.payload.pull_request?.id : context.payload.issue?.id) ?? 0;

export const getContentType = (context: Context): string => ContextHelper.isPr(context) ? 'PullRequest' : 'Issue';
