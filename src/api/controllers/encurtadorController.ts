import EncurtadorService from '../../services/encurtadorService'
const encurtadorService = new EncurtadorService()

class encurtadorController {

    public async encurtarUrl(req, res) {
        try {
            const { url } = req.body
            if(url){
                const newUrl = await encurtadorService.encurtarUrl(url)
                res.status(201).send({ newUrl: newUrl })}
            else {
                const error = {
                    code: "preconditionFailed",
                    message: "Solicitação mal formada"
                }
                res.status(400).send(error)
            }
        } catch (error) {
            res.status(500).send(error)
        }
    }

    public async getUrl(req, res) {
        try {
            const { newUrl } = req.params
            const rows = await encurtadorService.getUrl(newUrl)

            res.redirect(301, rows.length > 0 ? rows[0].url : "erro404.html")
        } catch (error) {
            res.status(500).send(error)
        }
    }
}

export default encurtadorController