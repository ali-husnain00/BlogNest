import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { 
        type: String,
        required: true, 
        unique: true, 
        trim: true 
    },
    email: { type: String,
        required: true, 
        unique: true, 
        lowercase: true 
    },
    password: { 
        type: String,
        required: true 
    },
    profilePic: { type: String, default: 'https://i.sstatic.net/l60Hf.png' },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
      }
    ]
  }, { timestamps: true });
  

export default mongoose.model('User', userSchema);
