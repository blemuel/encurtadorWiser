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
const dbconnector_1 = __importDefault(require("../dbconfig/dbconnector"));
const shortid_1 = __importDefault(require("shortid"));
class encurtadorService {
    gerarUrl() {
        return __awaiter(this, void 0, void 0, function* () {
            const id = yield shortid_1.default.generate();
            const newUrl = id.slice(0, 9);
            return newUrl;
        });
    }
    encurtarUrl(url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield dbconnector_1.default.connect();
                let newUrl = yield this.gerarUrl();
                let verificador = yield this.getUrl(newUrl);
                while (verificador.length > 0) {
                    newUrl = yield this.gerarUrl();
                    verificador = yield this.getUrl(newUrl);
                }
                newUrl = process.env.URL_API + newUrl;
                const expiresat = new Date;
                //Define que a url será válida por 7 dias
                expiresat.setDate(expiresat.getDate() + 7);
                const sql = "INSERT INTO urls (url, newurl, expiresat) VALUES ($1, $2, $3)";
                yield client.query(sql, [url, newUrl, expiresat]);
                client.release();
                return newUrl;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getUrl(newUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield dbconnector_1.default.connect();
                newUrl = process.env.URL_API + newUrl;
                const now = new Date().toUTCString();
                const sql = `SELECT * FROM urls WHERE newurl = '${newUrl}' AND expiresat > timestamp '${now}'`;
                const { rows } = yield client.query(sql);
                client.release();
                return rows;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = encurtadorService;
//# sourceMappingURL=encurtadorService.js.map