import mongoose from "mongoose"

const GroupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  image: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'admin' },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'admin' }],
  category:{type:String},
  isOpen:{type:String},
  featured:{type:String},
  recentDiscussion:{type:String, default:""}
}, { timestamps: true });

export const GroupModel = mongoose.model('Group', GroupSchema);
