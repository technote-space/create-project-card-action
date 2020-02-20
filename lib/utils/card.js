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
const github_action_helper_1 = require("@technote-space/github-action-helper");
const constant_1 = require("../constant");
const createCard = (columnId, contentId, contentType, logger, octokit) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield octokit.projects.createCard({
            'column_id': columnId,
            'content_id': contentId,
            'content_type': contentType,
        });
    }
    catch (error) {
        logger.warn(error.message);
        return false;
    }
    finally {
        yield github_action_helper_1.Utils.sleep(constant_1.SLEEP);
    }
    return true;
});
exports.createCards = (columnIds, contentId, contentType, logger, octokit) => __awaiter(void 0, void 0, void 0, function* () {
    const results = [];
    for (const columnId of columnIds) {
        results.push(yield createCard(columnId, contentId, contentType, logger, octokit));
    }
    return {
        total: results.length,
        succeeded: results.filter(result => result).length,
        failed: results.filter(result => !result).length,
    };
});
