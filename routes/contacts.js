const express = require('express');
const router = express.Router();

// @route GET api/contacts
//  @desc Get all users contacts
// @access Public

router.get('/', (req, res) => {
    res.send('Get all contacts');
});

// @route POST api/contacts
//  @desc Add new contact
// @access private

router.post('/', (req, res) => {
    res.send('Add contact');
});

// @route PUT api/contacts/:id
//  @desc Update contact
// @access Private

router.put('/:id', (req, res) => {
    res.send('Update Contact');
});

// @route Delete api/contacts
//  @desc Delete  contact
// @access Private

router.delete('/:id', (req, res) => {
    res.send('Delete contact');
});

module.exports = router;