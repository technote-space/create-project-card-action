import type { Octokit } from '@technote-space/github-action-helper/dist/types';
import type { Logger } from '@technote-space/github-action-log-helper';
import { Utils } from '@technote-space/github-action-helper';
import { SLEEP } from '../constant';

export const getColumnIds = async(projectIds: Array<number>, columnName: string, logger: Logger, octokit: Octokit): Promise<Array<number>> => {
  const columnIds: Array<number> = [];
  for (const projectId of projectIds) {
    const columnId = (await octokit.paginate(
      octokit.rest.projects.listColumns,
      { 'project_id': projectId },
    )).find(item => item.name === columnName)?.id;
    if (undefined !== columnId) {
      columnIds.push(columnId);
    }
    await Utils.sleep(SLEEP);
  }

  return columnIds;
};
