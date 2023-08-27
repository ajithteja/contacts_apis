const mongoose = require('mongoose');

const contactsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please Provide Name'],
    },
    email: {
      type: String,
      required: [true, 'Please Add Contact Email Address'],
    },
    phone: {
      type: String,
      required: [true, 'Please add contact mobile number'],
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.model('Contact', contactsSchema);

module.exports = Contact;
