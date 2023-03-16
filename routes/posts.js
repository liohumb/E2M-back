const router = require( 'express' ).Router()

const Post = require( '../models/Post' )

/* CREATE */
router.post( '/', async ( req, res ) => {
    const newPost = new Post( req.body )

    try {
        const savedPost = await newPost.save()
        res.status( 200 ).json( savedPost )
    } catch (e) {
        res.status( 500 ).json( { e: e.message } )
    }
} )

/* GET */
router.get( '/:id', async ( req, res ) => {
    try {
        const post = await Post.findById( req.params.id )
        res.status( 200 ).json( post )
    } catch (e) {
        res.status( 500 ).json( { e: e.message } )
    }
} )

/* GET ALL */
router.get( '/', async ( req, res ) => {
    try {
        const posts = await Post.find()
        res.status( 200 ).json( posts )
    } catch (e) {
        res.status( 500 ).json( { e: e.message } )
    }
} )

/* UPDATE */
router.put( '/:id', async ( req, res ) => {
    try {
        const post = await Post.findById( req.params.id )

        if (post.author === req.body.user._id) {
            try {
                const updatedPost = await Post.findByIdAndUpdate(
                    req.params.id,
                    { $set: req.body },
                    { new: true }
                )

                res.status( 200 ).json( updatedPost )
            } catch (e) {
                res.status( 500 ).json( { e: e.message } )
            }
        } else {
            res.status( 401 ).json( { message: 'Vous ne pouvez pas modifier un post qui n\'est pas le votre' } )
        }
    } catch (e) {
        res.status( 500 ).json( { e: e.message } )
    }
} )

/* DELETE */
router.delete( '/:id', async ( req, res ) => {
    try {
        const post = await Post.findById( req.params.id )

        if (post.author === req.body.user._id) {
            try {
                await post.delete()
                res.status( 200 ).json( { message: 'Le post à bien été supprimé' } )
            } catch (e) {
                res.status( 500 ).json( { e: e.message } )
            }
        } else {
            res.status( 401 ).json( { message: 'Vous ne pouvez pas supprimé un post que n\'est pas le votre' } )
        }
    } catch (e) {
        res.status( 500 ).json( { e: e.message } )
    }
} )

module.exports = router