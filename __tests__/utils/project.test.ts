/* eslint-disable no-magic-numbers */
import nock from 'nock';
import path from 'path';
import { Context } from '@actions/github/lib/context';
import { GitHub } from '@actions/github' ;
import { testEnv, disableNetConnect, getApiFixture, generateContext } from '@technote-space/github-action-test-helper';
import { Logger } from '@technote-space/github-action-helper';
import { getRepoProject, getOrgProject, getUserProject, getProjectIds } from '../../src/utils/project';

const fixturesDir = path.resolve(__dirname, '../fixtures');
const logger      = new Logger();
const octokit     = new GitHub('');
const getContext  = (payload = {}): Context => generateContext({
	event: 'pull_request',
	action: 'opened',
	owner: 'hello',
	repo: 'world',
}, {
	payload,
});

describe('getRepoProject', () => {
	disableNetConnect(nock);

	it('should return undefined', async() => {
		expect(await getRepoProject('Backlog', logger, octokit, getContext())).toBeUndefined();
		expect(await getRepoProject('Backlog', logger, octokit, getContext({
			repository: {'has_projects': false},
		}))).toBeUndefined();
	});

	it('should return repo project', async() => {
		nock('https://api.github.com')
			.persist()
			.get('/repos/hello/world/projects?state=open&page=1')
			.reply(200, getApiFixture(fixturesDir, 'repos.projects'))
			.get('/repos/hello/world/projects?state=open&page=2')
			.reply(200, () => []);

		expect(await getRepoProject('Backlog', logger, octokit, getContext({
			repository: {'has_projects': true},
		}))).toBe(234);
	});
});

describe('getOrgProject', () => {
	testEnv();
	disableNetConnect(nock);

	it('should return undefined 1', async() => {
		expect(await getOrgProject('Backlog', logger, octokit, getContext())).toBeUndefined();
	});

	it('should return undefined 2', async() => {
		process.env.INPUT_CHECK_ORG_PROJECT = 'true';
		expect(await getOrgProject('Backlog', logger, octokit, getContext())).toBeUndefined();
	});

	it('should return org project', async() => {
		process.env.INPUT_CHECK_ORG_PROJECT = 'true';
		nock('https://api.github.com')
			.persist()
			.get('/orgs/hello/projects?state=open&page=1')
			.reply(200, getApiFixture(fixturesDir, 'repos.projects'))
			.get('/orgs/hello/projects?state=open&page=2')
			.reply(200, () => []);

		expect(await getOrgProject('Backlog', logger, octokit, getContext({
			organization: {},
		}))).toBe(234);
	});
});

describe('getUserProject', () => {
	testEnv();
	disableNetConnect(nock);

	it('should return undefined 1', async() => {
		expect(await getUserProject('Backlog', logger, octokit, getContext())).toBeUndefined();
	});

	it('should return undefined 2', async() => {
		process.env.INPUT_CHECK_USER_PROJECT = 'true';
		expect(await getUserProject('Backlog', logger, octokit, getContext({
			organization: {},
		}))).toBeUndefined();
	});

	it('should return user project', async() => {
		process.env.INPUT_CHECK_USER_PROJECT = 'true';
		nock('https://api.github.com')
			.persist()
			.get('/users/hello/projects?state=open&page=1')
			.reply(200, getApiFixture(fixturesDir, 'repos.projects'))
			.get('/users/hello/projects?state=open&page=2')
			.reply(200, () => []);

		expect(await getUserProject('Backlog', logger, octokit, getContext())).toBe(234);
	});
});

describe('getProjectIds', () => {
	testEnv();
	disableNetConnect(nock);

	it('should get project ids', async() => {
		process.env.INPUT_CHECK_ORG_PROJECT = 'true';
		nock('https://api.github.com')
			.persist()
			.get('/orgs/hello/projects?state=open&page=1')
			.reply(200, getApiFixture(fixturesDir, 'repos.projects'))
			.get('/orgs/hello/projects?state=open&page=2')
			.reply(200, () => []);

		expect(await getProjectIds('Backlog', logger, octokit, getContext({
			organization: {},
		}))).toEqual([234]);
	});
});
