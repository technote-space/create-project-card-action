import { getInput } from '@actions/core' ;
import { Utils } from '@technote-space/github-action-helper';

export const getProjectName = (): string => getInput('PROJECT', { required: true });
export const getColumnName  = (): string => getInput('COLUMN', { required: true });
export const isActive       = (target: string): boolean => Utils.getBoolValue(getInput(`CHECK_${target}_PROJECT`));
