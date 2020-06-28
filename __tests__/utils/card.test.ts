/* eslint-disable no-magic-numbers */
import nock from 'nock';
import {disableNetConnect, getOctokit, spyOnStdout, stdoutCalledWith} from '@technote-space/github-action-test-helper';
import {Logger} from '@technote-space/github-action-helper';
import {createCards} from '../../src/utils/card';

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
