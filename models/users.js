import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: 'First name is required.',
    match: [/^[A-Z]+$/i, 'Please enter alphabets only'],
  },
  lastName: {
    type: String,
    trim: true,
    required: 'Last name is required!',
    match: [/^[A-Z]+$/i, 'Please enter alphabets only'],
  },
  email: {
    type: String,
    unique: true,
    match: [/.+@.+\..+/, 'Please enter a valid e-mail address'],
  },
  password: {
    type: String,
    trim: true,
    required: 'Password is Required',
    validate: [input => input.length >= 6, 'Password should be longer than 6.'],
  },
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
