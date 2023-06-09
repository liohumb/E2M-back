const express = require( 'express' )
const dotenv = require( 'dotenv' )
const mongoose = require( 'mongoose' )
const cors = require( 'cors' )
const multer = require( 'multer' )
const path = require( 'path' )
const ws = require( 'ws' )
const http = require( 'http' )

const authRoutes = require( './routes/auth' )
const newUserRoutes = require( './routes/newUser' )
const postRoutes = require( './routes/posts' )
const productRoutes = require( './routes/products' )
const userRoutes = require( './routes/users' )
const commentRoutes = require( './routes/comments' )
const socialRoutes = require( './routes/socials' )
const activityRoutes = require( './routes/activities' )
const searchRoutes = require( './routes/search' )
const chatRoutes = require( './routes/chat' )
const messageRoutes = require( './routes/message' )

/* CONFIGURATIONS */
const app = express()

dotenv.config()

app.use( cors() )
app.use( express.json() )

/* UPLOAD */
const storage = multer.diskStorage( {
    destination: ( req, file, cb ) => {
        cb( null, 'images' )
    },
    filename: ( req, file, cb ) => {
        cb( null, req.body.name )
    }
} )

const upload = multer( { storage: storage } )

app.use( '/upload', upload.single( 'file' ), ( req, res ) => {
    res.status( 200 ).json( { message: 'L\'image a bien été enregistré' } )
} )
app.use( '/images', express.static( path.join( __dirname, '/images' ) ) )

/* ROUTES */
app.use( '/auth', authRoutes )
app.use( '/new-user', newUserRoutes )
app.use( '/post', postRoutes )
app.use( '/product', productRoutes )
app.use( '/user', userRoutes )
app.use( '/comment', commentRoutes )
app.use( '/social', socialRoutes )
app.use( '/activity', activityRoutes )
app.use( '/search', searchRoutes )
app.use( '/chat', chatRoutes )
app.use( '/message', messageRoutes )

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001

mongoose.set( 'strictQuery', true )
const httpServer = http.createServer( app )
mongoose
    .connect( process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    } )
    .then( console.log( 'La base de donnée MongoDB est connecté' ) )
    .then( () => {
        httpServer.listen( PORT, () => console.log( `Le serveur est en route => PORT: ${PORT}` ) )
    } )
    .catch( ( error ) => console.log( `${error} connexion impossible` ) )

/* WEBSOCKET SERVER */
const wss = new ws.Server( { server: httpServer } )

wss.on( 'connection', ( connection, req ) => {
    console.log( 'Websocket est en route' )
    console.log( wss )
} )
