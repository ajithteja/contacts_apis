const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'please provide userName'],
    },
    email: {
      type: String,
      required: [true, 'please provide the email address'],
      unique: [true, 'Email already exist'],
    },
    password: {
      type: String,
      required: [true, 'please add the user password'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
