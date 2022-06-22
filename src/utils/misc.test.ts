/* eslint-disable no-magic-numbers */
import path from 'path';
import { testEnv } from '@technote-space/github-action-test-helper';
import { describe, expect, it } from 'vitest';
import { getProjectName, getColumnName, isActive } from './misc';

const rootDir = path.resolve(__dirname, '../..');

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
