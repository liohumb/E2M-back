const express = require( 'express' )
const dotenv = require( 'dotenv' )
const mongoose = require( 'mongoose' )
const cors = require( 'cors' )
const multer = require( 'multer' )

const authRoutes = require( './routes/auth' )
const newUserRoutes = require( './routes/newUser' )
const postRoutes = require( './routes/posts' )
const userRoutes = require( './routes/users' )

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

/* ROUTES */
app.use( '/auth', authRoutes )
app.use( '/new-user', newUserRoutes )
app.use( '/post', postRoutes )
app.use( '/user', userRoutes )

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001

mongoose.set( 'strictQuery', true )
mongoose.connect( process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
} ).then( console.log( 'La base de donnée MongoDB est connecté' ) )
    .then( () => {
        app.listen( PORT, () => console.log( `Le serveur est en route => PORT: ${PORT}` ) )
    } ).catch( ( error ) => console.log( `${error} connexion impossible` ) )