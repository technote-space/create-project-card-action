/* eslint-disable no-magic-numbers */
import nock from 'nock';
import { GitHub } from '@actions/github' ;
import { disableNetConnect } from '@technote-space/github-action-test-helper';
import { Logger } from '@technote-space/github-action-helper';
import { createCards } from '../../src/utils/card';

const logger  = new Logger();
const octokit = new GitHub('test-token');

describe('createCards', () => {
	disableNetConnect(nock);

	it('should get column ids', async() => {
		nock('https://api.github.com')
			.persist()
			.post('/projects/columns/1/cards')
			.reply(422)
			.post('/projects/columns/2/cards')
			.reply(201)
			.post('/projects/columns/3/cards')
			.reply(422);

		expect(await createCards([1, 2, 3], 123, 'PullRequest', logger, octokit)).toEqual({
			total: 3,
			succeeded: 1,
			failed: 2,
		});
	});
});
