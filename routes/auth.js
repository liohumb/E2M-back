const router = require( 'express' ).Router()
const nodemailer = require( 'nodemailer' )
const bcrypt = require( 'bcrypt' )

const User = require( '../models/User' )
const NewUser = require( '../models/NewUser' )

/* EMAIL VERIFICATION */
router.post( '/pre-inscription', async ( req, res ) => {
    try {
        const generateUser = async ( email ) => {
            const existUser = await NewUser.findOne( { email } )

            if (existUser) return existUser.token

            const length = 32
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

            let token = ''

            for (let i = 0; i < length; i++) {
                token += chars.charAt( Math.floor( Math.random() * chars.length ) )
            }

            const newUser = new NewUser( { email, token } )
            await newUser.save()

            return token
        }

        const { email } = req.body
        const newUser = await generateUser( email )

        const transporter = nodemailer.createTransport( {
            host: process.env.HOST,
            port: process.env.MAIL_PORT,
            secure: true,
            auth:
                {
                    user: process.env.EMAIL,
                    pass: process.env.PASS
                }
        } )

        await transporter.sendMail( {
            from: process.env.EMAIL,
            to: email,
            subject: 'Entre 2 Mains vous souhaite la bienvenue !',
            html: `<p>Cliquez <a href="http://localhost:3000/inscription/${newUser}">here</a> pour continuer votre inscription.`
        } )

        res.status( 200 ).json( { message: 'Email envoyé avec succès' } )
    } catch (e) {
        res.status( 500 ).json( { e: e.message } )
    }
} )

/* CHECK EMAIL */
router.post( '/email-verification', async ( req, res ) => {
    try {
        const { email } = req.body
        const user = await User.findOne( { email: email } )

        if (user) {
            res.json( { passwordRequired: true } )
        } else {
            res.json( { passwordRequired: false } )
        }
    } catch (e) {
        res.status( 500 ).json( { e: e.message } )
    }
} )

/* REGISTER */
router.post( '/inscription', async ( req, res ) => {
    try {
        const { role, firstname, lastname, email, password, society } = req.body
        const salt = await bcrypt.genSalt()
        const hash = await bcrypt.hash( password, salt )

        const newUser = new User( {
            role, firstname, lastname, email, password: hash, society
        } )
        const savedUser = await newUser.save()

        res.status( 201 ).json( savedUser )
    } catch (e) {
        res.status( 500 ).json( { e: e.message } )
    }
} )

/* LOGIN */
router.post( '/connexion', async ( req, res ) => {
    try {
        const user = await User.findOne( { email: req.body.email } )
        !user && res.status( 400 ).json( { message: 'Utilisateur inconnue' } )

        const isMatch = await bcrypt.compare( req.body.password, user.password )
        !isMatch && res.status( 400 ).json( { message: 'Mot de passe incorrect' } )

        const { password, ...others } = user._doc

        res.status( 200 ).json( others )
    } catch (e) {
        res.status( 500 ).json( { e: e.message } )
    }
} )

module.exports = router