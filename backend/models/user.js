const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  defaultResume: {
    fileUrl: String,  // URL to the stored resume file
    textVersion: String // Parsed text for AI processing
  }
}, { timestamps: true }); // adds createdAt & updatedAt automatically

const User = mongoose.model('User', userSchema);
module.exports = User;
