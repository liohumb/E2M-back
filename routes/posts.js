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
    const { id } = req.params
    const updatedPost = req.body

    try {
        let post = await Post.findById( id )

        if (!post) {
            res.status( 404 ).json( { message: 'Produit introuvable' } )
        } else {
            if (updatedPost.removeUser) {
                post.users = post.users.filter( ( userId ) => userId.toString() !== updatedPost.removeUser )
                delete updatedPost.removeUser
            } else if (updatedPost.users) {
                post.users.push( updatedPost.users )
                delete updatedPost.users
            }

            Object.assign( post, updatedPost )

            const updated = await post.save()
            res.status( 200 ).json( updated )
        }
    } catch (e) {
        res.status( 500 ).json( { e: e.message } )
    }
} )

/* DELETE */
router.delete( '/:id', async ( req, res ) => {
    try {
        await Post.findByIdAndDelete( req.params.id )
        res.status( 200 ).json( { message: 'Le produit a bien été supprimé' } )
    } catch (e) {
        res.status( 500 ).json( { e: e.message } )
    }
} )

module.exports = router