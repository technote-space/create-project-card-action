import { setupGlobal } from '@technote-space/github-action-test-helper';
import { vi } from 'vitest';

setupGlobal();

vi.mock('./constant', async() => ({
  ...await vi.importActual<{ SLEEP: number }>('./constant'),
  SLEEP: 0,
}));
