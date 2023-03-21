const router = require( 'express' ).Router()
const Product = require( '../models/Product' )

/* CREATE */
router.post( '/', async ( req, res ) => {
    const newProduct = new Product( req.body )

    try {
        const savedProduct = await newProduct.save()
        res.status( 200 ).json( savedProduct )
    } catch (e) {
        res.status( 500 ).json( { e: e.message } )
    }
} )

/* GET */
router.get( '/:id', async ( req, res ) => {
    try {
        const product = await Product.findById( req.params.id )
        res.status( 200 ).json( product )
    } catch (e) {
        res.status( 500 ).json( { e: e.message } )
    }
} )

/* GET ALL */
router.get( '/', async ( req, res ) => {
    try {
        const products = await Product.find()
        res.status( 200 ).json( products )
    } catch (e) {
        res.status( 500 ).json( { e: e.message } )
    }
} )

/* UPDATE */
router.put( '/:id', async ( req, res ) => {
    const { id } = req.params
    const updatedProduct = req.body

    try {
        let product = await Product.findById( id )

        if (!product) {
            res.status( 404 ).json( { message: 'Produit introuvable' } )
        } else {
            if (updatedProduct.removeUser) {
                product.users = product.users.filter( ( userId ) => userId.toString() !== updatedProduct.removeUser )
                delete updatedProduct.removeUser
            } else if (updatedProduct.users) {
                product.users.push( updatedProduct.users )
                delete updatedProduct.users
            }

            Object.assign( product, updatedProduct )

            const updated = await product.save()
            res.status( 200 ).json( updated )
        }
    } catch (e) {
        res.status( 500 ).json( { e: e.message } )
    }
} )


/* DELETE */
router.delete( '/:id', async ( req, res ) => {
    try {
        await Product.findByIdAndDelete( req.params.id )
        res.status( 200 ).json( { message: 'Le produit a bien été supprimé' } )
    } catch (e) {
        res.status( 500 ).json( { e: e.message } )
    }
} )

module.exports = router