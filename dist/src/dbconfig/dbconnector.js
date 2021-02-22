"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
exports.default = new pg_1.Pool({
    max: 20,
    connectionString: 'postgres://postgres:1234@localhost:5431/encurtador',
    idleTimeoutMillis: 30000
});
//# sourceMappingURL=dbconnector.js.map