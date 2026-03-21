import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  aesthetic: { type: String, required: true },
  mediaUrls: [{ type: String }],
  mediaType: { type: String, default: 'image' },
  price: { type: Number, required: true },
  stock: { type: Number, default: 1 },
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Post || mongoose.model('Post', PostSchema);
