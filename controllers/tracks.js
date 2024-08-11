const Track = require('../models/track');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const newTrack = await Track.create(req.body);
        res.status(201).json(newTrack);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
});

router.get('/', async (req, res, next) => {
    try {
        const tracks = await Track.find();
        res.status(200).json(tracks);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

router.get('/:trackId', async (req, res, next) => {
    try {
        const track = await Track.findById(req.params.trackId);
        if (!track) {
            res.status(404);
            throw new Error('Track not found.');
          }
        res.status(200).json(track);
    } catch (error) {
        if (res.statusCode === 404) {
            res.json({ error: error.message });
          } else {
            res.status(500).json({ error: error.message });
          }
    }
});

router.put('/:trackId', async (req, res, next) => {
    try {
        const trackToBeUpdated = await Track.findByIdAndUpdate(req.params.trackId, req.body, {new: true});
        if (!trackToBeUpdated) {
            res.status(404);
            throw new Error('Track not found.');
        }
        res.status(200).json(trackToBeUpdated);
    } catch (error) {
        if (res.statusCode === 404) {
            res.json({ error: error.message });
          } else {
            res.status(500).json({ error: error.message });
          }
    }
});

router.delete('/:trackId', async (req, res, next) => {
    try {
        const track = await Track.findByIdAndDelete(req.params.trackId);
        if (!track) {
            res.status(404);
            throw new Error('Track not found');
        }
        res.status(200).json(track);
    } catch (error) {
        if (res.statusCode === 404) {
            res.json({error: error.message});
        } else {
            res.status(500).json({error: error.message});
        }
    }
});



module.exports = router;