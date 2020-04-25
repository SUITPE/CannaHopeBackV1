"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class GeneralServices {
    static getDocuments(req, res) {
        const type = req.params.type;
        const documentPath = req.params.documentPath;
        if (type === 'userImage') {
            const pathImage = path_1.default.resolve(__dirname, `../../../docs/userImages/${documentPath}`);
            if (fs_1.default.existsSync(pathImage)) {
                res.sendFile(pathImage);
            }
        }
        else {
            const pathNoImage = path_1.default.resolve(__dirname, '../../../docs/no-image.png');
            res.sendFile(pathNoImage);
        }
    }
}
exports.default = GeneralServices;
