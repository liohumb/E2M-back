const router = require('express').Router();
const Activity = require('../models/Activity');

/* CREATE */
router.post('/', async (req, res) => {
    const newActivity = new Activity(req.body);

    try {
        const savedActivity = await newActivity.save();
        res.status(200).json(savedActivity);
    } catch (e) {
        res.status(500).json({ e: e.message });
    }
});

/* GET */
router.get('/:id', async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.id);
        res.status(200).json(activity);
    } catch (e) {
        res.status(500).json({ e: e.message });
    }
});

/* GET ALL */
router.get('/', async (req, res) => {
    try {
        const activities = await Activity.find();
        res.status(200).json(activities);
    } catch (e) {
        res.status(500).json({ e: e.message });
    }
});

/* UPDATE */
router.put('/:id', async (req, res) => {
    try {
        const updatedActivity = await Activity.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        res.status(200).json(updatedActivity);
    } catch (e) {
        res.status(500).json({ e: e.message });
    }
});

/* DELETE */
router.delete('/:id', async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.id);
        await activity.delete();
        res.status(200).json({ message: "L'activité a bien été supprimée" });
    } catch (e) {
        res.status(500).json({ e: e.message });
    }
});

module.exports = router;
