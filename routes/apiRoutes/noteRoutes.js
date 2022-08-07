const router = require('express').Router();
const { createNewNote, validateNote } = require('../../lib/notes.js');
const { notes } = require('../../data/notes.json');

router.get('/notes', (req, res) => {
  let results = notes;
  res.json(results);
});

router.get('/notes/:id', (req, res) => {
  const result = findById(req.params.id, notes);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

router.post('/notes', (req, res) => {
  req.body.id = notes.length.toString();

  if (!validateNote(req.body)) {
    res.status(400).send('Error');
  } else {
    const note = createNewNote(req.body, notes);
    res.json(note);
  }
});

module.exports = router;