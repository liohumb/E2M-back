const router = require('express').Router()
const bcrypt = require('bcrypt')

const User = require('../models/User')
const Post = require('../models/Post')

/* GET */
router.get('/:id', async ( req, res ) => {
    try {
        const user = await User.findById(req.params.id)
        const {password, others} = user._doc
        
        res.status(200).json(others)
    } catch (e) {
        res.status(500).json({e: e.message})
    }
})

/* GET ALL */
router.get('/', async ( req, res ) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (e) {
        res.status(500).json({e: e.message})
    }
})

/* UPDATE */
router.put('/:id', async ( req, res) => {
    if (req.body.userId === req.params.id) {
        let password = (req.body.password).toString()

        if (req.body.password) {
            const salt = await bcrypt.genSalt()
            req.body.password = await bcrypt.hash(password, salt)
        }

        try{
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                {$set: req.body},
                {new: true}
            )

            res.status(200).json(updatedUser)
        } catch (e) {
            res.status(500).json({e: e.message})
        }
    } else {
        res.status(401).json({message: "Vous ne pouvez pas mettre à jour un profil qui n'est pas le votre"})
    }
})

/* DELETE */
router.delete('/:id', async ( req, res ) => {
    if (req.body.userId === req.params.id) {
        try {
            const user = await User.findById(req.params.id)

            try {
                await Post.deleteMany({author: user._id})
                await User.findByIdAndDelete(req.params.id)

                res.status(200).json({message: "L'utilisateur a bien été supprimé"})
            } catch (e) {
                res.status(500).json({e: e.message})
            }
        } catch (e) {
            res.status(401).json({message: "Utilisateur inconnue"})
        }
    } else {
        res.status(401).json({message: "Vous ne pouvez pas supprimer un profil autre que le votre"})
    }
})

module.exports = router