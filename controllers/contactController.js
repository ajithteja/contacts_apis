const asyncHandler = require('express-async-handler');

const mongoose = require('mongoose');

const Contact = require('../models/contactsModel');

const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();

  console.log({ contacts });

  res.status(200).json({
    contacts,
  });
});

const getSingleContact = asyncHandler(async (req, res) => {
  let contact;

  try {
    contact = await Contact.findById(req.params.id);
  } catch (error) {
    console.log('error');
  }

  if (!contact) {
    console.log({ contact });
    res.status(400);
    throw new Error('Contacts Not Found');
  }
  res.status(200).json({
    contact,
  });
});

const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  //   console.log({ req: req.body });

  if (!name || !email || !phone) {
    res.status(404);
    throw new Error('ALL FIELDS REQUIRED');
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
  });

  res.status(200).json({
    contact,
  });
});

const updateContact = asyncHandler(async (req, res) => {
  let updatedContact;

  try {
    updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body);
  } catch (error) {
    console.log(error);
  }

  if (!updatedContact) {
    res.status(400);
    throw new Error('Contacts Not Found');
  }

  res.status(200).json({
    updatedContact,
  });
});

const deleteContact = asyncHandler(async (req, res) => {
  let contact;

  try {
    contact = await Contact.findByIdAndDelete(req.params.id);
  } catch (error) {
    console.log(error);
  }
  if (!contact) {
    res.status(400);
    throw new Error('Contact Not Found');
  }
  // await Contact.remove(contact);

  res.status(200).json({
    message: `Delete ${req.params.id} Contacts`,
  });
});

module.exports = {
  getAllContacts,
  getSingleContact,
  createContact,
  updateContact,
  deleteContact,
};
