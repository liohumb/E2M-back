const express = require( 'express' )
const dotenv = require( 'dotenv' )
const mongoose = require( 'mongoose' )
const cors = require( 'cors' )

/* CONFIGURATIONS */
const app = express()

dotenv.config()

app.use( cors() )
app.use( express.json() )

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