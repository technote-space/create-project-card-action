"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
const github_action_helper_1 = require("@technote-space/github-action-helper");
exports.getProjectName = () => core_1.getInput('PROJECT', { required: true });
exports.getColumnName = () => core_1.getInput('COLUMN', { required: true });
exports.isActive = (target) => github_action_helper_1.Utils.getBoolValue(core_1.getInput(`CHECK_${target}_PROJECT`));
