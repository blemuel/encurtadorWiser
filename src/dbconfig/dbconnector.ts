import { Pool } from 'pg'

export default new Pool ({
    max: 20,
    connectionString: 'postgres://postgres:315289@postgres:5432/postgres',
    idleTimeoutMillis: 30000
});