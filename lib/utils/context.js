"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContentType = exports.getContentId = void 0;
const github_action_helper_1 = require("@technote-space/github-action-helper");
// eslint-disable-next-line no-magic-numbers
const getContentId = (context) => { var _a, _b, _c; return (_c = (github_action_helper_1.ContextHelper.isPr(context) ? (_a = context.payload.pull_request) === null || _a === void 0 ? void 0 : _a.id : (_b = context.payload.issue) === null || _b === void 0 ? void 0 : _b.id)) !== null && _c !== void 0 ? _c : 0; };
exports.getContentId = getContentId;
const getContentType = (context) => github_action_helper_1.ContextHelper.isPr(context) ? 'PullRequest' : 'Issue';
exports.getContentType = getContentType;
