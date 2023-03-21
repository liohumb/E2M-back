const router = require( 'express' ).Router()
const User = require( '../models/User' )
const Post = require( '../models/Post' )
const Product = require( '../models/Product' )

router.get( '/', async ( req, res ) => {
    const search = req.query.q

    try {
        const posts = await Post.find( {
            description: { $regex: search, $options: 'i' }
        } )
        const products = await Product.find( {
            title: { $regex: search, $options: 'i' }
        } )
        const users = await User.find( {
            $or: [{ firstname: { $regex: search, $options: 'i' } },
                { lastname: { $regex: search, $options: 'i' } }]
        } )

        res.json( { posts, products, users } )
    } catch (error) {
        res.status( 500 ).json( { message: 'Error searching data' } )
    }
} )

module.exports = router