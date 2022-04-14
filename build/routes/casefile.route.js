"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const casefiles_1 = __importDefault(require("../handlers/casefiles"));
const router = express_1.default.Router();
router.post('/casefiles/new', casefiles_1.default.addACasefile);
router.get('/casefiles/', casefiles_1.default.getAllCasefiles);
router.get('/casefiles/:id', casefiles_1.default.getACasefile);
router.put('/casefiles/:id', casefiles_1.default.updateACasefile);
router.delete('/casefiles/:id', casefiles_1.default.deleteACasefile);
exports.default = router;
