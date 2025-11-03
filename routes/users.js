const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('User list');
});

router.get('/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`User details for ID: ${userId}`);
}); 

router.post('/', (req, res) => {
  const newUser = req.body;
  console.log(newUser);
  res.status(201).send(`User created: ${JSON.stringify(newUser)}`);
});

router.put('/:id', (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;
  res.send(`User ID ${userId} updated with data: ${JSON.stringify(updatedUser)}`);
}); 

router.delete('/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`User ID ${userId} deleted`);
});

module.exports = router;
