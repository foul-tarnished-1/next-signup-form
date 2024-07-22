import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a username'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
  },
})

const User = mongoose.models.users || mongoose.model
("User", UserSchema);

export default User;
