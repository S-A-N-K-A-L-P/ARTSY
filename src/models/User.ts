import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  profile: {
    name: { type: String, required: true },
    avatar: { type: String, default: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200' },
    bio: { type: String, default: "" },
  },
  username: { type: String, unique: true, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, unique: true, sparse: true },
  password: { type: String },
  coverImage: { type: String, default: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1200' },
  address: { type: String, default: "" },
  aesthetic: {
    name: { type: String, default: 'soft' },
    background: { type: String, default: '#F5F2EE' },
    cardColor: { type: String, default: '#FFFFFF' },
    primaryText: { type: String, default: '#2C2C2C' },
    secondaryText: { type: String, default: '#A8A29E' },
    accent: { type: String, default: '#D6BFA7' },
    borderRadius: { type: Number, default: 18 },
    fontFamily: { type: String, default: 'Inter' },
    isDark: { type: Boolean, default: false },
  },
  isCreator: { type: Boolean, default: false },
  onboardingComplete: { type: Boolean, default: false },
  onboarding: { type: mongoose.Schema.Types.ObjectId, ref: 'OnboardingRecord' },
  token: { type: String, unique: true, sparse: true },
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
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
