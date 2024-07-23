import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  address: {
    phone: { type: String },
  },
  isActive: { type: Boolean, default: true },
}, {
  timestamps: true, // Automatically manage `createdAt` and `updatedAt` fields
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;