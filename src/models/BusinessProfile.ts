import mongoose from 'mongoose';

const BusinessProfileSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },

  organization: { type: String, required: true },
  address: { type: String, required: true },
  currentRole: { type: String, required: true },
  businessHandling: { type: String, required: true },
  productsSell: { type: String, required: true },
  minPrice: { type: Number },
  maxPrice: { type: Number },
  sampleImages: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.BusinessProfile || mongoose.model('BusinessProfile', BusinessProfileSchema);
