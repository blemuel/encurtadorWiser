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
const encurtadorService_1 = __importDefault(require("../../services/encurtadorService"));
const encurtadorService = new encurtadorService_1.default();
class encurtadorController {
    encurtarUrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { url } = req.body;
                if (url) {
                    const newUrl = yield encurtadorService.encurtarUrl(url);
                    res.status(201).send({ newUrl: newUrl });
                }
                else {
                    const error = {
                        code: "preconditionFailed",
                        message: "Solicitação mal formada"
                    };
                    res.status(400).send(error);
                }
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    getUrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { newUrl } = req.params;
                const rows = yield encurtadorService.getUrl(newUrl);
                res.redirect(301, rows.length > 0 ? rows[0].url : "erro404.html");
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
}
exports.default = encurtadorController;
//# sourceMappingURL=encurtadorController.js.map