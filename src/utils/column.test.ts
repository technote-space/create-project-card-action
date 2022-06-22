/* eslint-disable no-magic-numbers */
import path from 'path';
import { disableNetConnect, getApiFixture, getOctokit } from '@technote-space/github-action-test-helper';
import nock from 'nock';
import { describe, expect, it } from 'vitest';
import { getColumnIds } from './column';

const fixturesDir = path.resolve(__dirname, '../fixtures');
const octokit     = getOctokit();

describe('getColumnIds', () => {
  disableNetConnect(nock);

  it('should get column ids', async() => {
    nock('https://api.github.com')
      .persist()
      .get('/projects/1/columns')
      .reply(200, getApiFixture(fixturesDir, 'repos.columns'))
      .get('/projects/2/columns')
      .reply(200, () => [])
      .get('/projects/3/columns')
      .reply(200, () => []);

    expect(await getColumnIds([1, 2, 3], 'To do', octokit)).toEqual([456]);
  });
});
