const router = require( 'express' ).Router()
const Social = require( '../models/Social' )

/* CREATE */
router.post( '/', async ( req, res ) => {
    const newSocial = new Social( req.body )

    try {
        const savedSocial = await newSocial.save()
        res.status( 200 ).json( savedSocial )
    } catch (e) {
        res.status( 500 ).json( { e: e.message } )
    }
} )

/* GET */
router.get( '/:id', async ( req, res ) => {
    try {
        const social = await Social.findById( req.params.id )
        res.status( 200 ).json( social )
    } catch (e) {
        res.status( 500 ).json( { e: e.message } )
    }
} )

/* GET ALL */
router.get( '/', async ( req, res ) => {
    try {
        const socials = await Social.find()
        res.status( 200 ).json( socials )
    } catch (e) {
        res.status( 500 ).json( { e: e.message } )
    }
} )

/* UPDATE */
router.put( '/:id', async ( req, res ) => {
    try {
        const social = await Social.findById( req.params.id )

        if (social.user.toString() === req.body.user._id) {
            try {
                const updatedSocial = await Social.findByIdAndUpdate(
                    req.params.id,
                    { $set: req.body },
                    { new: true }
                )

                res.status( 200 ).json( updatedSocial )
            } catch (e) {
                res.status( 500 ).json( { e: e.message } )
            }
        } else {
            res.status( 401 ).json( { message: 'Vous ne pouvez pas modifier un élément Social qui n\'est pas lié à votre compte' } )
        }
    } catch (e) {
        res.status( 500 ).json( { e: e.message } )
    }
} )

/* DELETE */
router.delete( '/:id', async ( req, res ) => {
    try {
        const social = await Social.findById( req.params.id )

        if (social.user.toString() === req.body.user._id) {
            try {
                await social.delete()
                res.status( 200 ).json( { message: 'L\'élément Social a bien été supprimé' } )
            } catch (e) {
                res.status( 500 ).json( { e: e.message } )
            }
        } else {
            res.status( 401 ).json( { message: 'Vous ne pouvez pas supprimer un élément Social qui n\'est pas lié à votre compte' } )
        }
    } catch (e) {
        res.status( 500 ).json( { e: e.message } )
    }
} )

module.exports = router
