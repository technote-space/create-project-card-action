/* eslint-disable no-magic-numbers */
import nock from 'nock';
import path from 'path';
import { GitHub } from '@actions/github' ;
import { disableNetConnect, getApiFixture } from '@technote-space/github-action-test-helper';
import { Logger } from '@technote-space/github-action-helper';
import { getColumnIds } from '../../src/utils/column';

const fixturesDir = path.resolve(__dirname, '../fixtures');
const logger      = new Logger();
const octokit     = new GitHub('test-token');

describe('getColumnIds', () => {
	disableNetConnect(nock);

	it('should get column ids', async() => {
		nock('https://api.github.com')
			.persist()
			.get('/projects/1/columns?page=1')
			.reply(200, getApiFixture(fixturesDir, 'repos.columns'))
			.get('/projects/1/columns?page=2')
			.reply(200, () => [])
			.get('/projects/2/columns?page=1')
			.reply(200, () => [])
			.get('/projects/3/columns?page=1')
			.reply(200, () => []);

		expect(await getColumnIds([1, 2, 3], 'To do', logger, octokit)).toEqual([456]);
	});
});
