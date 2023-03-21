const router = require( 'express' ).Router()
const Comment = require( '../models/Comment' )

/* CREATE */
router.post( '/', async ( req, res ) => {
    const newComment = new Comment( req.body )

    try {
        const savedComment = await newComment.save()
        res.status( 200 ).json( savedComment )
    } catch (e) {
        res.status( 500 ).json( { message: e.message } )
    }
} )

/* GET ALL */
router.get( '/', async ( req, res ) => {
    try {
        const comment = await Comment.find()
        res.status( 200 ).json( comment )
    } catch (e) {
        res.status( 500 ).json( { message: e.message } )
    }
} )

/* DELETE */
router.delete( '/:id', async ( req, res ) => {
    try {
        await Comment.findByIdAndDelete( req.params.id )
        res.status( 200 ).json( { message: 'Le commentaire a bien été supprimé' } )
    } catch (e) {
        res.status( 500 ).json( { message: e.message } )
    }
} )


module.exports = router