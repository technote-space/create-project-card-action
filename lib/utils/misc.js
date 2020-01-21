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
const core_1 = require("@actions/core");
const github_action_helper_1 = require("@technote-space/github-action-helper");
const constant_1 = require("../constant");
exports.getProjectName = () => core_1.getInput('PROJECT', { required: true });
exports.getColumnName = () => core_1.getInput('COLUMN', { required: true });
exports.isActive = (target) => github_action_helper_1.Utils.getBoolValue(core_1.getInput(`CHECK_${target}_PROJECT`));
exports.paged = (generator, filter, mapper, max, logger) => __awaiter(void 0, void 0, void 0, function* () {
    let page = 1;
    let items = [];
    const results = [];
    do {
        try {
            items = yield generator(page++);
        }
        catch (error) {
            logger.error(error.message);
            return results;
        }
        results.push(...items.filter(filter).map(mapper));
        yield github_action_helper_1.Utils.sleep(constant_1.SLEEP);
    } while (items.length && (max <= 0 || results.length < max)); // eslint-disable-line no-magic-numbers
    return max <= 0 ? results : results.slice(0, max); // eslint-disable-line no-magic-numbers
});
exports.search = (generator, filter, mapper, logger) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield exports.paged(generator, filter, mapper, 1, logger); // eslint-disable-line no-magic-numbers
    if (results.length) {
        return results[0];
    }
    return undefined;
});
