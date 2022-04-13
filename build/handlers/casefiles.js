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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handler_1 = require("../interfaces/handler");
const index_js_1 = __importDefault(require("../models/index.js"));
const uuid_1 = require("uuid");
const CasefilesModel = index_js_1.default.Casefile;
class Casefiles extends handler_1.BaseHandler {
    // Add a new Casefile
    static addACasefile(req, res) {
        CasefilesModel.create({
            id: req.body.id,
            caseID: `SHO_${(0, uuid_1.v4)()}`,
            caseType: req.body.caseType,
            client: req.body.client,
            gender: req.body.gender,
            occupation: req.body.occupation,
            brief: req.body.brief,
            letter_of_engagement: req.body.letter_of_engagement
        })
            .then((newCasefile) => {
            return res
                .status(201)
                .send({
                success: true,
                message: 'Casefile added successfully',
                data: newCasefile
            });
        })
            .catch((err) => console.log(err));
    }
    // Get all casefiles
    static getAllCasefiles(req, res) {
        CasefilesModel.findAll().then((casefiles) => {
            return res.status(200).send({
                success: true,
                message: 'Casefiles retrieved successfully',
                data: casefiles
            });
        });
    }
    // Get a specific casefile
    static getACasefile(req, res) {
        const id = Number(req.params.id);
        CasefilesModel.findOne({
            where: { id }
        }).then((casefile) => {
            if (!casefile)
                return res.status(404).send({ success: false, message: 'Casefile not found' });
            return res.status(200).send({
                success: true,
                message: 'Casefile retrieved successfully',
                data: casefile
            });
        });
    }
    // Update a casefile
    static updateACasefile(req, res) {
        const casefileId = Number(req.params.id);
        CasefilesModel.findByPk(casefileId).then((casefile) => {
            if (casefile) {
                const { caseID, caseType, client, gender, occupation, brief, letter_of_engagement } = req.body;
                return casefile
                    .update({
                    caseID: caseID || casefile.caseID,
                    caseType: caseType || casefile.caseType,
                    client: client || casefile.client,
                    gender: gender || casefile.gender,
                    occupation: occupation || casefile.occupation,
                    brief: brief || casefile.brief,
                    letter_of_engagement: letter_of_engagement || casefile.letter_of_engagement
                })
                    .then((casefile) => {
                    return res.status(200).send({
                        success: true,
                        message: 'Casefile Updated Successfully',
                        data: casefile
                    });
                });
            }
            else {
                return res
                    .status(404)
                    .send({
                    success: false,
                    message: 'Casefile not found! Enter a valid ID'
                });
            }
        });
    }
    // Delete a casefile
    static deleteACasefile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const casefileId = Number(req.params.id);
            const casefile = yield CasefilesModel.findByPk(casefileId);
            if (!casefile) {
                return res.status(404).send({
                    success: false,
                    message: 'Casefile not found. Use a valid'
                });
            }
            return casefile.destroy().then(() => {
                return res.status(200).send({
                    success: true,
                    message: 'Casefile Successfully Deleted'
                });
            });
        });
    }
}
exports.default = Casefiles;
