/* eslint-disable no-magic-numbers */
import nock from 'nock';
import path from 'path';
import {disableNetConnect, getApiFixture, getOctokit} from '@technote-space/github-action-test-helper';
import {Logger} from '@technote-space/github-action-helper';
import {getColumnIds} from '../../src/utils/column';

const fixturesDir = path.resolve(__dirname, '../fixtures');
const logger      = new Logger();
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

    expect(await getColumnIds([1, 2, 3], 'To do', logger, octokit)).toEqual([456]);
  });
});
