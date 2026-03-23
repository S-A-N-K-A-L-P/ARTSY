import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  pageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Page', required: true },
  
  type: { type: String, enum: ["showcase", "drop", "gallery", "editorial"], default: "showcase" },
  title: { type: String, required: true },
  caption: { type: String, default: "" },
  
  itemIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
  
  layout: { 
    type: { type: String, enum: ["grid", "list", "masonry", "carousel"], default: "grid" },
    columns: { type: Number, default: 3 }
  },
  
  visibility: { type: String, enum: ["public", "private", "unlisted"], default: "public" },
  
  engagement: {
    likes: { type: Number, default: 0 },
    comments: { type: Number, default: 0 }
  },
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.models.Post || mongoose.model('Post', PostSchema);
