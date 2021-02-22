import EncurtadorService from '../../services/encurtadorService'
const encurtadorService = new EncurtadorService()

class encurtadorController {

    public async encurtarUrl(req, res) {
        try {
            const { url } = req.body
            const newUrl = await encurtadorService.encurtarUrl(url)

            res.status(201).send({ newUrl: newUrl })
        } catch (error) {
            res.status(500).send(error)
        }
    }

    public async getUrl(req, res) {
        try {
            const { newUrl } = req.params
            const rows = await encurtadorService.getUrl(newUrl)
            if (rows.length > 0) {
                res.redirect(200, rows[0].url)
            }
            else {
                res.redirect(404, "erro404.html")
            }
        } catch (error) {
            res.status(500).send(error)
        }
    }
}

export default encurtadorController