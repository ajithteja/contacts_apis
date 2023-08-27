const express = require('express');
const {
  getAllContacts,
  getSingleContact,
  createContact,
  updateContact,
  deleteContact,
} = require('../controllers/contactController');

const contactRoute = express.Router();

contactRoute.get('/', getAllContacts);

contactRoute.get('/:id', getSingleContact);

contactRoute.post('/', createContact);

contactRoute.put('/:id', updateContact);

contactRoute.delete('/:id', deleteContact);

module.exports = contactRoute;
