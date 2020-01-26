/* eslint-disable no-magic-numbers */
import nock from 'nock';
import path from 'path';
import { Context } from '@actions/github/lib/context';
import { GitHub } from '@actions/github' ;
import { testEnv, disableNetConnect, getApiFixture, generateContext } from '@technote-space/github-action-test-helper';
import { Logger } from '@technote-space/github-action-helper';
import { execute } from '../src/process';

const rootDir     = path.resolve(__dirname, '..');
const fixturesDir = path.resolve(__dirname, 'fixtures');
const logger      = new Logger();
const octokit     = new GitHub('test-token');
const getContext  = (payload = {}): Context => generateContext({
	event: 'pull_request',
	action: 'opened',
	owner: 'hello',
	repo: 'world',
}, {
	payload,
});

describe('execute', () => {
	testEnv(rootDir);
	disableNetConnect(nock);

	it('should return false 1', async() => {
		process.env.INPUT_PROJECT = 'Backlog';
		process.env.INPUT_COLUMN  = 'To do';
		expect(await execute(logger, octokit, getContext())).toBe(false);
	});

	it('should return false 2', async() => {
		process.env.INPUT_PROJECT = 'Backlog';
		process.env.INPUT_COLUMN  = 'To do';
		nock('https://api.github.com')
			.persist()
			.get('/repos/hello/world/projects?state=open&page=1')
			.reply(200, getApiFixture(fixturesDir, 'repos.projects'))
			.get('/repos/hello/world/projects?state=open&page=2')
			.reply(200, () => [])
			.get('/projects/234/columns?page=1')
			.reply(200, () => []);

		expect(await execute(logger, octokit, getContext({
			repository: {'has_projects': true},
		}))).toBe(false);
	});

	it('should return true', async() => {
		process.env.INPUT_PROJECT = 'Backlog';
		process.env.INPUT_COLUMN  = 'To do';
		nock('https://api.github.com')
			.persist()
			.get('/repos/hello/world/projects?state=open&page=1')
			.reply(200, getApiFixture(fixturesDir, 'repos.projects'))
			.get('/repos/hello/world/projects?state=open&page=2')
			.reply(200, () => [])
			.get('/projects/234/columns?page=1')
			.reply(200, getApiFixture(fixturesDir, 'repos.columns'))
			.get('/projects/234/columns?page=2')
			.reply(200, () => [])
			.post('/projects/columns/456/cards')
			.reply(201);

		expect(await execute(logger, octokit, getContext({
			repository: {'has_projects': true},
		}))).toBe(true);
	});
});
