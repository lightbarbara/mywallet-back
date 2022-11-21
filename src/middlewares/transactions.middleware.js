import { sessionsCollection } from "../database/db"

export async function validationAuthorization(req, res, next) {
    const { authorization } = req.headers

    if (!authorization) {
        return res.sendStatus(401)
    }

    const token = authorization.replace('Bearer ', '')

    try {

        

        next()

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}