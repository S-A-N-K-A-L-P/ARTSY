import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, unique: true, sparse: true },
  password: { type: String },
  address: { type: String },
  username: { type: String, unique: true },
  avatar: { type: String },
  bio: { type: String },
  aesthetic: { type: String, default: 'soft' },
  isCreator: { type: Boolean, default: false },
  onboarding: { type: mongoose.Schema.Types.ObjectId, ref: 'Onboarding' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
