'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { v4: uuidv4 } = require('uuid');
module.exports = {
    up(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.bulkInsert('Casefiles', [
                {
                    caseID: `SHO_${uuidv4()}`,
                    caseType: 'Politics',
                    client: 'Dada Taiwo',
                    gender: 'Male',
                    occupation: 'Software Developer',
                    brief: 'BRIEF: is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type.',
                    letter_of_engagement: 'LETTER OF ENGAGMENT: is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley.',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    caseID: `SHO_${uuidv4()}`,
                    caseType: 'Land Settlement',
                    client: 'Fashola Olaniyi',
                    gender: 'Male',
                    occupation: 'Software Developer',
                    brief: 'BRIEF: is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type.',
                    letter_of_engagement: 'LETTER OF ENGAGMENT: is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley.',
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ], {});
        });
    },
    down(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.bulkDelete('Casefiles', null, {});
        });
    }
};
