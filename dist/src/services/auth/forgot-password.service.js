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
exports.forgotPasswordService = void 0;
const config_1 = require("../../config");
const jsonwebtoken_1 = require("jsonwebtoken");
const nodemailer_1 = require("../../lib/nodemailer");
const prisma_1 = __importDefault(require("../../lib/prisma"));
const forgotPasswordService = (body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = body;
        const user = yield prisma_1.default.user.findFirst({
            where: { email },
        });
        if (!user) {
            throw new Error("Invalid email address");
        }
        const token = (0, jsonwebtoken_1.sign)({ id: user.id }, config_1.JWT_SECRET_FORGOT_PASSWORD, {
            expiresIn: "15m",
        });
        const link = `${config_1.BASE_URL_FE}/reset-password/${token}`;
        nodemailer_1.transporter.sendMail({
            to: email,
            subject: "You Can Reset Password in Here",
            html: `<a href="${link}" target="_blank">You Can Reset Password in Here</a>`,
        });
        return { message: "Send email success" };
    }
    catch (error) {
        throw error;
    }
});
exports.forgotPasswordService = forgotPasswordService;
