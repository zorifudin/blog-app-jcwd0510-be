"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLOUDINARY_CLOUD_NAME = exports.CLOUDINARY_API_SECRET = exports.CLOUDINARY_API_KEY = exports.GMAIL_APP_PASSWORD = exports.GMAIL_EMAIL = exports.JWT_SECRET_FORGOT_PASSWORD = exports.JWT_SECRET = exports.BASE_URL_FE = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PORT = process.env.PORT;
exports.BASE_URL_FE = process.env.BASE_URL_FE;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_SECRET_FORGOT_PASSWORD = process.env.JWT_SECRET_FORGOT_PASSWORD;
exports.GMAIL_EMAIL = process.env.GMAIL_EMAIL;
exports.GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
exports.CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
exports.CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
exports.CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
