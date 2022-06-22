/* eslint-disable no-magic-numbers */
import { Logger } from '@technote-space/github-action-log-helper';
import { disableNetConnect, getOctokit, spyOnStdout, stdoutCalledWith } from '@technote-space/github-action-test-helper';
import nock from 'nock';
import { describe, expect, it } from 'vitest';
import { createCards } from './card';

const logger  = new Logger();
const octokit = getOctokit();

describe('createCards', () => {
  disableNetConnect(nock);

  it('should get column ids', async() => {
    const mockStdout = spyOnStdout();
    nock('https://api.github.com')
      .persist()
      .post('/projects/columns/1/cards')
      .reply(422, () => 'test1')
      .post('/projects/columns/2/cards')
      .reply(201)
      .post('/projects/columns/3/cards')
      .reply(422, () => 'test2');

    expect(await createCards([1, 2, 3], 123, 'PullRequest', logger, octokit)).toEqual({
      total: 3,
      succeeded: 1,
      failed: 2,
    });

    stdoutCalledWith(mockStdout, [
      '::warning::test1',
      '::warning::test2',
    ]);
  });
});
