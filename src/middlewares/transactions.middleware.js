import { sessionsCollection, usersCollection } from "../database/db.js"

export async function validationAuthorization(req, res, next) {
    const { authorization } = req.headers

    if (!authorization) {
        return res.sendStatus(401)
    }

    const token = authorization.replace('Bearer ', '')

    try {

        const session = await sessionsCollection.findOne({ token })

        if (!session) {
            return res.sendStatus(401)
        }

        const user = await usersCollection.findOne({ _id: session.userId })

        res.locals.user = user

        next()

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}