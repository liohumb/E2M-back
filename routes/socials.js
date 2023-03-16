const router = require( 'express' ).Router()
const Social = require( '../models/Social' )

/* CREATE */
router.post( '/', async ( req, res ) => {
    const { user, ...socialData } = req.body

    const newSocial = new Social( {
        ...socialData,
        user
    } )

    try {
        const savedSocial = await newSocial.save()
        res.status( 201 ).json( savedSocial )
    } catch (e) {
        console.error( e )
        res.status( 500 ).json( { message: e.message } )
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
        const user = req.query.user
        const socials = await Social.find( { user: user } )
        res.json( socials )
    } catch (err) {
        console.error( e )
        res.status( 500 ).json( { message: e.message } )
    }
} )

/* UPDATE */
router.put( '/:id', async ( req, res ) => {
    const { id } = req.params
    const updatedSocial = req.body

    try {
        const social = await Social.findByIdAndUpdate( id, updatedSocial, {
            new: true,
            useFindAndModify: false
        } )

        if (!social) {
            res.status( 404 ).json( { message: 'Réseaux social introuvable' } )
        } else {
            res.json( social )
        }
    } catch (e) {
        console.error( e )
        res.status( 500 ).json( { message: e.message } )
    }
} )

/* DELETE */
router.delete( '/:id', async ( req, res ) => {
    try {
        const social = await Social.findById( req.params.id )

        if (!req.user || !req.user._id) {
            res.status( 401 ).json( { message: 'Authentification requise' } )
            return
        }

        if (social.user.toString() === req.user._id.toString()) {
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
