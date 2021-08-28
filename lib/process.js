"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = void 0;
const misc_1 = require("./utils/misc");
const project_1 = require("./utils/project");
const column_1 = require("./utils/column");
const context_1 = require("./utils/context");
const card_1 = require("./utils/card");
const execute = (logger, octokit, context) => __awaiter(void 0, void 0, void 0, function* () {
    const projectName = (0, misc_1.getProjectName)();
    const columnName = (0, misc_1.getColumnName)();
    logger.startProcess('project: %s, column: %s', projectName, columnName);
    logger.startProcess('Getting target projects...');
    const projectIds = yield (0, project_1.getProjectIds)(projectName, logger, octokit, context);
    if (projectIds.length) {
        console.log(projectIds);
    }
    else {
        logger.warn('There are no target projects.');
        return false;
    }
    logger.startProcess('Getting target columns...');
    const columnIds = yield (0, column_1.getColumnIds)(projectIds, columnName, logger, octokit);
    if (columnIds.length) {
        console.log(columnIds);
    }
    else {
        logger.warn('There are no target columns.');
        return false;
    }
    logger.startProcess('Creating cards...');
    const results = yield (0, card_1.createCards)(columnIds, (0, context_1.getContentId)(context), (0, context_1.getContentType)(context), logger, octokit);
    console.log(results);
    return true;
});
exports.execute = execute;
