import mongoose, { Schema, Document } from 'mongoose';

export interface IOnboardingRecord extends Document {
  user: mongoose.Types.ObjectId;
  aesthetic: string;
  palette: string;
  onboardedAt: Date;
  metadata: Map<string, any>;
}

const OnboardingRecordSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  aesthetic: { type: String, default: 'soft' },
  palette: { type: String, default: 'classic' },
  onboardedAt: { type: Date, default: Date.now },
  metadata: { type: Map, of: Schema.Types.Mixed, default: {} }
}, { timestamps: true });

export default mongoose.models.OnboardingRecord || mongoose.model<IOnboardingRecord>('OnboardingRecord', OnboardingRecordSchema);
