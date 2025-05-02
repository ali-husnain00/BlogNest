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
    profilePic: { type: String, default: 'https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D' },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
      }
    ]
  }, { timestamps: true });
  

export default mongoose.model('User', userSchema);
