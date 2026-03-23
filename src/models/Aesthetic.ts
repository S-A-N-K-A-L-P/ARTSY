import mongoose from 'mongoose';

const AestheticSchema = new mongoose.Schema({
  name: { type: String, required: true },
  background: { type: String, required: true },
  cardColor: { type: String, required: true },
  primaryText: { type: String, required: true },
  secondaryText: { type: String, required: true },
  accent: { type: String, required: true },
  borderRadius: { type: Number, default: 12 },
  fontFamily: { type: String, default: 'Inter' },
  isDark: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Aesthetic || mongoose.model('Aesthetic', AestheticSchema);
