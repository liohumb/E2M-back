const router = require( 'express' ).Router()

const NewUser = require( '../models/NewUser' )

/* GET */
router.get( '/:token', async ( req, res ) => {
    try {
        const { token } = req.params
        const foundUser = await NewUser.findOne( { token } )

        if (foundUser) {
            res.status( 200 ).json( foundUser )
        } else {
            res.status( 404 ).json( false )
        }
    } catch (e) {
        res.status( 500 ).json( { e: e.message } )
    }
} )

/* DELETE */
router.delete( '/:email', async ( req, res ) => {
    try {
        const { email } = req.params
        const deleteUser = await NewUser.findOneAndDelete( { email } )

        if (deleteUser) {
            res.status( 200 ).json( { success: true } )
        } else {
            res.status( 404 ).json( { success: false, message: 'Utilisateur inconnue' } )
        }
    } catch (e) {
        res.status( 500 ).json( { success: false, e: e.message } )
    }
} )

module.exports = router