const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser')
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator')

// ROUTE 1 : Fetching all notes using GET "/api/notes/fetchallnotes" Login Required
router.get('/fetchallnotes', fetchUser,
    async (req, res) => {
        try {
            const notes = await Notes.find({ user: req.id })
            res.json(notes)
        } catch (error) {
            console.error(error.message);
            res.status(500).send("SOME INTERNAL SERVER ERROR OCCURED")
        }
    })

// ROUTE 2 : Adding a note using POST "/api/notes/addnote" Login Required
router.post('/addnote', fetchUser, [
    body('title', 'Enter a valid title').isLength({ min: 3,max: 15 }),
    body('description', 'Description must be of atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        userID = req.id;
        // console.log(userID)
        // new notes return a promise
        const note = new Notes({
            title,
            description,
            tag,
            user: userID
        })
        // returns a note
        const savedNote = await note.save()
        res.json(savedNote)
        // res.send("KUCH V NHI")
    } catch (error) {
        console.error(error.message);
        res.status(500).send("SOME INTERNAL SERVER ERROR OCCURED")
    }
})
// ROUTE 3 : Update an existing note using PUT "/api/notes/updatenote" Login Required
router.put('/updatenote/:id', fetchUser,
    async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            const newNote = {};

            // if these arguments are present then update otherwise don't
            if(title){newNote.title = title};
            if(description){newNote.description = description};
            if(tag){newNote.tag = tag};

            //Find the note to be updated and update it
            let note = await Notes.findById(req.params.id);
            if(!note){return res.status(404).send("NOT FOUND")}

            // Allow UPDATION only if user owns this Note
            if(note.user.toString() !== req.id){
                return res.status(401).send("NOT ALLOWED....");
            }
            note = await Notes.findByIdAndUpdate(req.params.id,{$set: newNote},{new:true})
            res.json({note})
        } 
        catch (error) {
            console.error(error.message);
            res.status(500).send("SOME INTERNAL SERVER ERROR OCCURED")
        }
    })

// ROUTE 4 : Delete an existing note using DELETE "/api/notes/deletenote" Login Required
router.delete('/deletenote/:id', fetchUser,
    async (req, res) => {
        try {
            //Find the note to be deleted and delete it
            let note = await Notes.findById(req.params.id);
            if(!note){return res.status(404).send("NOT FOUND")}

            // Allow DELETION only if user owns this Note
            if(note.user.toString() !== req.id){
                return res.status(401).send("NOT ALLOWED....");
            }
            note = await Notes.findByIdAndDelete(req.params.id)
            res.json({"SUCCESS":"DELETED THE NOTE"})
        } 
        catch (error) {
            console.error(error.message);
            res.status(500).send("SOME INTERNAL SERVER ERROR OCCURED")
        }
    })
module.exports = router