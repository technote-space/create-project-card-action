import { Octokit } from '@octokit/rest';
import { Utils, Logger } from '@technote-space/github-action-helper';
import { search } from './misc';
import { SLEEP } from '../constant';

export const getColumnIds = async(projectIds: Array<number>, columnName: string, logger: Logger, octokit: Octokit): Promise<Array<number>> => {
	const columnIds: Array<number> = [];
	for (const projectId of projectIds) {
		const columnId = await search<Octokit.ProjectsListColumnsResponseItem, number>(
			async(page: number) => (await octokit.projects.listColumns({'project_id': projectId, page})).data,
			item => item.name === columnName,
			item => item.id,
			logger,
		);
		if (undefined !== columnId) {
			columnIds.push(columnId);
		}
		await Utils.sleep(SLEEP);
	}

	return columnIds;
};
