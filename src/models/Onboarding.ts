import mongoose from 'mongoose';

const OnboardingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  intent: { type: String },
  aesthetics: [{ type: String }],
  interests: [{ type: String }],
  products: [{ type: String }],
  productType: [{ type: String }],
  palette: [{ type: String }],
  budget: { type: String },
  creatorType: { type: String },
  vibe: { type: String },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Onboarding || mongoose.model('Onboarding', OnboardingSchema);
