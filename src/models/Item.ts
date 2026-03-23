import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
  pageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Page', required: true },
  title: { type: String, required: true },
  description: { type: String, default: "" },
  images: [{ type: String }],
  
  price: { type: Number, default: 0 },
  currency: { type: String, default: 'INR' },
  category: { type: String, default: 'General' },
  status: { type: String, enum: ['active', 'archived', 'draft'], default: 'active' },
  inventory: { type: Number, default: 0 },
  isAvailable: { type: Boolean, default: true },
  
  // Dynamic polymorphic product fields (e.g. { brand: 'Nike', material: 'Wool' })
  attributes: { type: Map, of: String, default: {} },
  
  // Custom fields for random specifications
  customFields: [
    {
      key: String,
      label: String,
      value: String,
      type: { type: String, default: 'text' }
    }
  ],
  
  // Aesthetic override at item level
  aesthetic: { type: String, default: 'minimal' }
}, { timestamps: true });

export default mongoose.models.Item || mongoose.model('Item', ItemSchema);
