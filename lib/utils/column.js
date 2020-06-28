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
exports.getColumnIds = void 0;
const github_action_helper_1 = require("@technote-space/github-action-helper");
const constant_1 = require("../constant");
exports.getColumnIds = (projectIds, columnName, logger, octokit) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const columnIds = [];
    for (const projectId of projectIds) {
        const columnId = (_a = (yield octokit.paginate(octokit.projects.listColumns, { 'project_id': projectId })).find(item => item.name === columnName)) === null || _a === void 0 ? void 0 : _a.id;
        if (undefined !== columnId) {
            columnIds.push(columnId);
        }
        yield github_action_helper_1.Utils.sleep(constant_1.SLEEP);
    }
    return columnIds;
});
