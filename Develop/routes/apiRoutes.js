// dependencies
const express = require("express");
const router = express.Router();
// creates a random id
const { v4: uuidv4 } = require('uuid');
// brings in the store class object
const store = require("../db/store");

// route to get notes
// router.get("/notes", async function (req, res) {
//   const notes = await store.readNotes();
//   return res.json(notes);
// });
router.get('/notes', (req, res) => {
  store
    .getNotes()
    .then((notes) => {
      return res.json(notes);
    })
    .catch((err) => res.status(500).json(err));
});
// route to add a new note and add it to the json file
router.post("/notes", async function (req, res) {
  const currentNotes = await store.getNotes();
  let newNote = {
    id: uuidv4(),
    title: req.body.title,
    text: req.body.text,
  };

  await store.addNote([...currentNotes, newNote]);

  return res.send(newNote);
});

// // route to delete notes.  , after means its my variable i want to pass through.
// router.delete("/api/notes/:id", async function (req, res) {
//   // separates out the note to delete based on id
//   const noteToDelete = req.params.id;
//   // notes already in json file
//   const currentNotes = await store.readNotes();
//   // sort through notes file and create a new array minus the note in question
//   const newNoteData = currentNotes.filter((note) => note.id !== noteToDelete);

//   // sends the new array back the store class 
//   await store.deleteNote(newNoteData);
  
//   return res.send(newNoteData);
// });

module.exports = router;