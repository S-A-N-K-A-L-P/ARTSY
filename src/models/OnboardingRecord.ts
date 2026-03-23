import mongoose from 'mongoose';

const OnboardingRecordSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  aesthetic: { type: String, default: 'soft' },
  palette: { type: String, default: 'classic' },
  onboardedAt: { type: Date, default: Date.now },
  metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
});

export default mongoose.models.OnboardingRecord || mongoose.model('OnboardingRecord', OnboardingRecordSchema);
