import { getInput } from '@actions/core' ;
import { Utils, Logger } from '@technote-space/github-action-helper';
import { SLEEP } from '../constant';

export const getProjectName = (): string => getInput('PROJECT', {required: true});
export const getColumnName  = (): string => getInput('COLUMN', {required: true});
export const isActive       = (target: string): boolean => Utils.getBoolValue(getInput(`CHECK_${target}_PROJECT`));

export const paged = async <ItemType, ResultType>(
	generator: (page: number) => Promise<Array<ItemType>>,
	filter: (item: ItemType) => boolean,
	mapper: (item: ItemType) => ResultType,
	max: number,
	logger: Logger,
): Promise<Array<ResultType>> => {
	let page                    = 1;
	let items: ItemType[]       = [];
	const results: ResultType[] = [];

	do {
		try {
			items = await generator(page++);
		} catch (error) {
			logger.error(error.message);
			return results;
		}

		results.push(...items.filter(filter).map(mapper));
		await Utils.sleep(SLEEP);
	} while (items.length && (max <= 0 || results.length < max)); // eslint-disable-line no-magic-numbers

	return max <= 0 ? results : results.slice(0, max); // eslint-disable-line no-magic-numbers
};

export const search = async <ItemType, ResultType>(
	generator: (page: number) => Promise<Array<ItemType>>,
	filter: (item: ItemType) => boolean,
	mapper: (item: ItemType) => ResultType,
	logger: Logger,
): Promise<ResultType | undefined> => {
	const results: ResultType[] = await paged<ItemType, ResultType>(generator, filter, mapper, 1, logger); // eslint-disable-line no-magic-numbers
	if (results.length) {
		return results[0];
	}

	return undefined;
};
