import pool from '../dbconfig/dbconnector';
import shortid from 'shortid'

class encurtadorService {

    public async gerarUrl() {
        const id = await shortid.generate()
        const newUrl = id.slice(0, 9)
        return newUrl
    }

    public async encurtarUrl(url) {
        try {
            const client = await pool.connect();
            let newUrl = await this.gerarUrl()
            
            // let verificador = await this.getUrl(newUrl)
            // while (verificador.length > 0) {
            //     newUrl = await this.gerarUrl()
            //     verificador = await this.getUrl(newUrl)
            // }

            const expiresat = new Date
            console.log(expiresat)
            expiresat.setDate(expiresat.getDate() + 7);
          
            const sql = "INSERT INTO urls (url, newurl, expiresat) VALUES ($1, $2, $3)";
            await client.query(sql, [url, newUrl, expiresat]);

            client.release();

            return newUrl
            
        } catch (error) {
            throw error
        }
    }

    public async getUrl(newUrl) {
        try {
            const client = await pool.connect();

            let now = new Date
            // now.setDate(now.getDate() + 7);

            const sql = `SELECT * FROM urls WHERE newurl = '${newUrl}' AND expiresat > timestamp '${now}'`;
            const { rows } = await client.query(sql);

            client.release();

            return rows
        } catch (error) {
            console.log(error)
             throw error
        }
    }
}

export default encurtadorService;