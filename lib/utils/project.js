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
exports.getProjectIds = exports.getUserProject = exports.getOrgProject = exports.getRepoProject = void 0;
const misc_1 = require("./misc");
// eslint-disable-next-line camelcase
const getRepoProject = (projectName, logger, octokit, context) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    return ((_a = context.payload.repository) === null || _a === void 0 ? void 0 : _a.has_projects) ? (_b = (yield octokit.paginate(octokit.rest.projects.listForRepo, Object.assign(Object.assign({}, context.repo), { state: 'open' }))).find(item => item.name === projectName)) === null || _b === void 0 ? void 0 : _b.id : undefined;
});
exports.getRepoProject = getRepoProject;
const getOrgProject = (projectName, logger, octokit, context) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    return misc_1.isActive('ORG') && 'organization' in context.payload ? (_c = (yield octokit.paginate(octokit.rest.projects.listForOrg, { org: context.repo.owner, state: 'open' })).find(item => item.name === projectName)) === null || _c === void 0 ? void 0 : _c.id : undefined;
});
exports.getOrgProject = getOrgProject;
const getUserProject = (projectName, logger, octokit, context) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    return misc_1.isActive('USER') && !('organization' in context.payload) ? (_d = (yield octokit.paginate(octokit.rest.projects.listForUser, { username: context.repo.owner, state: 'open' })).find(item => item.name === projectName)) === null || _d === void 0 ? void 0 : _d.id : undefined;
});
exports.getUserProject = getUserProject;
const getProjectIds = (projectName, logger, octokit, context) => __awaiter(void 0, void 0, void 0, function* () {
    const projectIds = [];
    for (const generator of [exports.getRepoProject, exports.getOrgProject, exports.getUserProject]) {
        const projectId = yield generator(projectName, logger, octokit, context);
        if (undefined !== projectId) {
            projectIds.push(projectId);
        }
    }
    return projectIds;
});
exports.getProjectIds = getProjectIds;
