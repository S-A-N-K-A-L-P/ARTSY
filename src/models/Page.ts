import mongoose from 'mongoose';

const PageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, default: "" },
  coverImage: { type: String, default: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1200" },
  aesthetic: { type: String }, // Optional override
  type: { type: String, enum: ["store", "gallery", "portfolio"], default: "gallery" },
  isPublic: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Update the updatedAt field before saving
PageSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.Page || mongoose.model('Page', PageSchema);
