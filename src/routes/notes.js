// importing express
const express = require('express');

// import controllers
const getNotesController = require('../controllers/notes/getNotes');
const getNoteController = require('../controllers/notes/getNote');
const createNoteController = require('../controllers/notes/createNote');
const updateNoteController = require('../controllers/notes/updateNote');
const deleteNoteController = require('../controllers/notes/deleteNote');

// create a router instance
const router = express.Router();

// Get notes route 
router.get('/notes', getNotesController);

// Get note route
router.get('/notes/:id', getNoteController);

// Create note route
router.post('/notes', createNoteController);

// Update note route
router.put('/notes/:id', updateNoteController);

// Delete note route
router.delete('/notes/:id', deleteNoteController);

module.exports = router;