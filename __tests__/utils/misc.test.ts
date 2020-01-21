/* eslint-disable no-magic-numbers */
import nock from 'nock';
import path from 'path';
import { testEnv, disableNetConnect } from '@technote-space/github-action-test-helper';
import { Logger } from '@technote-space/github-action-helper';
import { getProjectName, getColumnName, isActive, paged, search } from '../../src/utils/misc';

const rootDir = path.resolve(__dirname, '../..');
const logger  = new Logger();

describe('getProjectName', () => {
	testEnv(rootDir);

	it('should return project name', () => {
		process.env.INPUT_PROJECT = 'Backlog';
		expect(getProjectName()).toBe('Backlog');
	});

	it('should throw error', () => {
		expect(() => getProjectName()).toThrow();
	});
});

describe('getColumnName', () => {
	testEnv(rootDir);

	it('should return column name', () => {
		process.env.INPUT_COLUMN = 'To do';
		expect(getColumnName()).toBe('To do');
	});

	it('should throw error', () => {
		expect(() => getColumnName()).toThrow();
	});
});

describe('isActive', () => {
	testEnv(rootDir);

	it('should return true 1', () => {
		process.env.INPUT_CHECK_ORG_PROJECT = 'true';
		expect(isActive('ORG')).toBe(true);
	});

	it('should return true 2', () => {
		process.env.INPUT_CHECK_USER_PROJECT = '1';
		expect(isActive('USER')).toBe(true);
	});

	it('should return false 1', () => {
		expect(isActive('ORG')).toBe(false);
	});

	it('should return false 2', () => {
		process.env.INPUT_CHECK_ORG_PROJECT = 'false';
		expect(isActive('ORG')).toBe(false);
	});
});

describe('paged', () => {
	disableNetConnect(nock);

	it('should return empty 1', async() => {
		expect(await paged<number, number>(
			async() => [] as number[],
			() => true,
			() => 0,
			0,
			logger,
		)).toHaveLength(0);
	});

	it('should return empty 2', async() => {
		expect(await paged<number, number>(
			async(page) => 3 === page ? [] as number[] : [1, 2, 3],
			() => false,
			() => 0,
			0,
			logger,
		)).toHaveLength(0);
	});

	it('should Interrupt', async() => {
		expect(await paged<number, number>(
			async(page) => {
				if (3 === page) {
					throw new Error('');
				}
				return [page];
			},
			() => true,
			item => item,
			0,
			logger,
		)).toEqual([1, 2]);
	});

	it('should get paged results', async() => {
		expect(await paged<number, number>(
			async() => [1, 2, 3],
			() => true,
			item => item * 2,
			10,
			logger,
		)).toEqual([2, 4, 6, 2, 4, 6, 2, 4, 6, 2]);
	});
});

describe('search', () => {
	it('should return undefined', async() => {
		expect(await search<number, number>(
			async() => [] as number[],
			() => true,
			() => 0,
			logger,
		)).toBeUndefined();
	});

	it('should return result', async() => {
		expect(await search<number, number>(
			async() => [1, 2, 3],
			() => true,
			item => item * 10,
			logger,
		)).toBe(10);
	});
});
