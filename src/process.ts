import { GitHub } from '@actions/github';
import { Context } from '@actions/github/lib/context';
import { Logger } from '@technote-space/github-action-helper';
import { getProjectName, getColumnName } from './utils/misc';
import { getProjectIds } from './utils/project';
import { getColumnIds } from './utils/column';
import { getContentId, getContentType } from './utils/context';
import { createCards } from './utils/card';

export const execute = async(logger: Logger, octokit: GitHub, context: Context): Promise<boolean> => {
	const projectName = getProjectName();
	const columnName  = getColumnName();
	logger.startProcess('project: %s, column: %s', projectName, columnName);

	logger.startProcess('Getting target projects...');
	const projectIds = await getProjectIds(projectName, logger, octokit, context);
	if (projectIds.length) {
		console.log(projectIds);
	} else {
		logger.warn('There are no target projects.');
		return false;
	}

	logger.startProcess('Getting target columns...');
	const columnIds = await getColumnIds(projectIds, columnName, logger, octokit);
	if (columnIds.length) {
		console.log(columnIds);
	} else {
		logger.warn('There are no target columns.');
		return false;
	}

	logger.startProcess('Creating cards...');
	const results = await createCards(columnIds, getContentId(context), getContentType(context), logger, octokit);
	console.log(results);

	return true;
};
