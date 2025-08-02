import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
import connectdb from './config/db.js';
import Authrouter from './routes/Auth.routes.js'
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.routes.js';
import cors from 'cors';
import listingRouter from './routes/listing.routes.js';
import bookingRounter from './routes/booking.routes.js';
dotenv.config();      
const app = express()
app.use(cors(
   {
    //  origin:'http://localhost:5173',
     origin:'https://airbn-clone.onrender.com/',
    credentials: true
}
))
app.use(cookieParser())
app.use(express.json())
const port = process.env.PORT || 3000;
app.use('/api/auth', Authrouter)
app.use('/api/listing', listingRouter);
app.use('/api/user', userRouter)
app.use('/api/booking', bookingRounter)

app.get('/', (req, res) => {
    res.send('Hello world')
    console.log('Port value is:', process.env.PORT)
})

app.listen(3000, () => {
    connectdb()
    console.log(`server is listening ${port}`)
})
