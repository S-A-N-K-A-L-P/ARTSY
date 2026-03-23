import mongoose from 'mongoose';

const PageSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },

  type: { type: String, enum: ["store", "gallery", "portfolio"], default: "gallery" },
  aesthetic: {
    theme: { type: String, default: 'minimal' },
    custom: {
      primaryColor: { type: String, default: '#000' },
      font: { type: String, default: 'inter' },
      spacing: { type: String, default: 'compact' }
    }
  },

  description: { type: String, default: "" },
  coverImage: { type: String, default: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1200" },
  logo: { type: String, default: "" },

  stats: {
    followers: { type: Number, default: 0 },
    views: { type: Number, default: 0 }
  },

  settings: {
    isPublic: { type: Boolean, default: true },
    allowComments: { type: Boolean, default: true }
  },

  postIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Update the updatedAt field before saving
PageSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.Page || mongoose.model('Page', PageSchema);
