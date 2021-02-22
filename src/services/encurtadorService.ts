import pool from '../dbconfig/dbconnector'
import shortid from 'shortid'

class encurtadorService {

    public async gerarUrl() {
        const id = await shortid.generate()
        const newUrl = id.slice(0, 9)
        return newUrl
    }

    public async encurtarUrl(url) {
        try {
            const client = await pool.connect()
            let newUrl = await this.gerarUrl()
            
            let verificador = await this.getUrl(newUrl)
            while (verificador.length > 0) {
                newUrl = await this.gerarUrl()
                verificador = await this.getUrl(newUrl)
            }

            newUrl = process.env.URL_API + newUrl
            const expiresat = new Date
            //Define que a url será válida por 7 dias
            expiresat.setDate(expiresat.getDate() + 7)
          
            const sql = "INSERT INTO urls (url, newurl, expiresat) VALUES ($1, $2, $3)"
            await client.query(sql, [url, newUrl, expiresat])

            client.release()

            return newUrl
            
        } catch (error) {
            throw error
        }
    }

    public async getUrl(newUrl) {
        try {
            const client = await pool.connect()
            newUrl = process.env.URL_API + newUrl

            const now = new Date().toUTCString()

            const sql = `SELECT * FROM urls WHERE newurl = '${newUrl}' AND expiresat > timestamp '${now}'`
            const { rows } = await client.query(sql)

            client.release()

            return rows
        } catch (error) {
            throw error
        }
    }
}

export default encurtadorService