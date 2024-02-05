import mongoose, { Schema } from 'mongoose';

const UserSchema = new mongoose.Schema({
  web3authId: { type: String, required: true },
  username: { type: String, required: true },
  firstname: {type: String, required: true},
  lastname: {type: String, required: true},
  verifiedCitizen: { type: Boolean, default: false },
  aadhaarId: { type: String },
  location: {
    state: { type: String },
    village: { type: String },
  },
  transactionHistory: [{
    transactionId: { type: String, required: true },
    impactReportId: { type: String, required: true },
    amount: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
    comment: { type: String },
  }],
  preferredIssues: { type: [String] },
});

const User = mongoose.model('User', UserSchema)

export default User;
