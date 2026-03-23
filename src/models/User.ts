import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, unique: true, sparse: true },
  password: { type: String },
  username: { type: String, unique: true, required: true },
  avatar: { type: String, default: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200' },
  coverImage: { type: String, default: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1200' },
  bio: { type: String, default: "" },
  address: { type: String, default: "" },
  aesthetic: { type: String, default: 'soft' },
  isCreator: { type: Boolean, default: false },
  
  socialLinks: {
    instagram: { type: String, default: "" },
    twitter: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    github: { type: String, default: "" },
    website: { type: String, default: "" },
  },

  provider: { type: String, enum: ["credentials", "google"], default: "credentials" },
  
  postsCount: { type: Number, default: 0 },
  followersCount: { type: Number, default: 0 },
  followingCount: { type: Number, default: 0 },

  pages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Page' }],
  onboarding: { type: mongoose.Schema.Types.ObjectId, ref: 'Onboarding' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
