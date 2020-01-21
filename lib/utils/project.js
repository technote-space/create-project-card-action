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
const misc_1 = require("./misc");
// eslint-disable-next-line camelcase
exports.getRepoProject = (projectName, logger, octokit, context) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    return ((_a = context.payload.repository) === null || _a === void 0 ? void 0 : _a.has_projects) ? misc_1.search((page) => __awaiter(void 0, void 0, void 0, function* () { return (yield octokit.projects.listForRepo({ owner: context.repo.owner, repo: context.repo.repo, state: 'open', page })).data; }), item => item.name === projectName, item => item.id, logger) : undefined;
});
exports.getOrgProject = (projectName, logger, octokit, context) => __awaiter(void 0, void 0, void 0, function* () {
    return misc_1.isActive('ORG') && 'organization' in context.payload ? misc_1.search((page) => __awaiter(void 0, void 0, void 0, function* () { return (yield octokit.projects.listForOrg({ org: context.repo.owner, state: 'open', page })).data; }), item => item.name === projectName, item => item.id, logger) : undefined;
});
exports.getUserProject = (projectName, logger, octokit, context) => __awaiter(void 0, void 0, void 0, function* () {
    return misc_1.isActive('USER') && !('organization' in context.payload) ? misc_1.search((page) => __awaiter(void 0, void 0, void 0, function* () { return (yield octokit.projects.listForUser({ username: context.repo.owner, state: 'open', page })).data; }), item => item.name === projectName, item => item.id, logger) : undefined;
});
exports.getProjectIds = (projectName, logger, octokit, context) => __awaiter(void 0, void 0, void 0, function* () {
    const projectIds = [];
    for (const generator of [exports.getRepoProject, exports.getOrgProject, exports.getUserProject]) {
        const projectId = yield generator(projectName, logger, octokit, context);
        if (undefined !== projectId) {
            projectIds.push(projectId);
        }
    }
    return projectIds;
});
