import { Pool } from 'pg';

export default new Pool ({
    max: 20,
    connectionString: 'postgres://postgres:1234@localhost:5431/encurtador',
    idleTimeoutMillis: 30000
});