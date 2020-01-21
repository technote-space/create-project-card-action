import { setupGlobal } from '@technote-space/github-action-test-helper';

setupGlobal();

jest.mock('./src/constant', () => ({SLEEP: 0}));
