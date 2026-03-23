import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
  pageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Page', required: true },
  title: { type: String, required: true },
  description: { type: String, default: "" },
  images: [{ type: String }],
  
  price: { type: Number },
  currency: { type: String, default: "INR" },
  isForSale: { type: Boolean, default: false },
  
  // Dynamic product fields
  attributes: { type: Map, of: String },
  
  // Custom fields for random specs
  customFields: [{
    key: { type: String },
    value: { type: String }
  }],
  
  aesthetic: { type: String }, // Optional override
  category: { type: String }, // e.g. "clothing", "furniture", "art"
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

ItemSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.Item || mongoose.model('Item', ItemSchema);
