import { MongoClient} from 'mongodb'
import dotenv from 'dotenv'
dotenv.config()

const mongoclient = new MongoClient(process.env.MONGO_URI)

try {
    await mongoclient.connect()
    console.log('MongoDB connected')
} catch (err) {
    console.log(err)
}

const db = mongoclient.db('my-wallet')
export const usersCollection = db.collection('users')
export const sessionsCollection = db.collection('sessions')
export const transactionsCollection = db.collection('transactions')