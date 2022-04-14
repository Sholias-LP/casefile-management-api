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
const sequelize_1 = require("sequelize");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isEmail_1 = __importDefault(require("validator/lib/isEmail"));
const index_js_1 = __importDefault(require("../models/index.js"));
const UserModel = index_js_1.default.User;
const secret = process.env.SECRET;
class User {
    // Register user
    static Register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, isEmail_1.default)(req.body.email)) {
                return res.status(400).send({ message: 'Email Invalid' });
            }
            else {
                const password = req.body.password;
                const confirmPassword = req.body.confirmPassword;
                const checkPasword = password === confirmPassword;
                if (!checkPasword)
                    return res.status(400).send({ message: 'Passwords do not match' });
                const [user, created] = yield UserModel.findOrCreate({
                    where: { email: req.body.email },
                    defaults: {
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        role: req.body.role,
                        hash: password
                    }
                });
                if (created) {
                    return res.status(200).send({
                        success: true,
                        message: 'Sign Up Sucessful!',
                        data: {
                            fullname: `${user.firstName} ${user.lastName}`,
                            email: user.email,
                            role: user.role,
                            token: jsonwebtoken_1.default.sign({
                                firstName: req.body.firstName,
                                lastName: req.body.lastName,
                                email: req.body.email,
                                id: user.id,
                                role: user.role
                            }, secret)
                        }
                    });
                }
                else {
                    return res.status(400).send({ message: 'User Already Exists' });
                }
            }
        });
    }
    // Sign-In User
    static signIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, isEmail_1.default)(req.body.email)) {
                return res.status(400).send({ message: 'Invalid Email' });
            }
            else {
                const user = yield UserModel.findOne({ where: { email: req.body.email } });
                if (user) {
                    if (!bcrypt_1.default.compareSync(req.body.password, user.hash)) {
                        return res.status(400).send({ message: 'Invalid Password' });
                    }
                    else {
                        return res.status(200).send({
                            success: true,
                            message: 'Sign in Successful',
                            data: {
                                firstName: user.firstName,
                                lastName: user.lastName,
                                email: user.email,
                                role: user.role,
                                token: jsonwebtoken_1.default.sign({
                                    firstName: user.firstName,
                                    lastName: user.lastName,
                                    email: user.email,
                                    role: user.role,
                                    id: user.id
                                }, secret)
                            }
                        });
                    }
                }
                else {
                    return res.status(400).send({ message: 'Email or password incorrect' });
                }
            }
        });
    }
    // Get All Users
    static getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            UserModel.findAll().then((counsel) => {
                return res.status(200).send({
                    success: true,
                    data: counsel
                });
            });
        });
    }
    // Get Users By Role
    static getUsersByRole(req, res) {
        UserModel.findAll({
            where: {
                role: {
                    [sequelize_1.Op.substring]: `%${req.query.role}%`
                }
            }
        }).then((users) => {
            if (users.length === 0)
                return res.send({ message: 'BadRequest' });
            res.status(200).send({
                success: true,
                message: `${req.query.role}s retrieved sucessfully`,
                data: users
            });
        });
    }
}
exports.default = User;
