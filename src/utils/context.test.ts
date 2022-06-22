/* eslint-disable no-magic-numbers */
import { describe, expect, it } from 'vitest';
import { Context } from '@actions/github/lib/context';
import { generateContext } from '@technote-space/github-action-test-helper';
import { getContentId, getContentType } from './context';

const getContext = (event: string, payload = {}): Context => generateContext({
  event,
  action: 'opened',
  owner: 'hello',
  repo: 'world',
}, {
  payload,
});

describe('getContentId', () => {
  it('should get pr id', () => {
    expect(getContentId(getContext('pull_request', {
      'pull_request': {
        id: 123,
      },
    }))).toBe(123);
  });

  it('should get issue id', () => {
    expect(getContentId(getContext('issues', {
      issue: {
        id: 123,
      },
    }))).toBe(123);
  });

  it('should not get content id', () => {
    expect(getContentId(getContext('push'))).toBe(0);
    expect(getContentId(getContext('pull_request'))).toBe(0);
  });
});

describe('getContentType', () => {
  it('should return PullRequest', () => {
    expect(getContentType(getContext('pull_request', {
      'pull_request': {
        id: 123,
      },
    }))).toBe('PullRequest');
  });

  it('should return Issue', () => {
    expect(getContentType(getContext('issues', {
      issue: {
        id: 123,
      },
    }))).toBe('Issue');
    expect(getContentType(getContext('issues'))).toBe('Issue');
  });
});
