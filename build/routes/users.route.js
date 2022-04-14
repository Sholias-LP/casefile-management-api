"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("../handlers/users"));
const router = express_1.default.Router();
router.post('/register', users_1.default.Register);
router.post('/signin', users_1.default.signIn);
router.get('/', users_1.default.getAllUsers);
router.get('/role', users_1.default.getUsersByRole);
exports.default = router;
