import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export type Status = 'online' | 'away' | 'offline';

export interface UserSchema extends Document {
  username: string;
  password: string;
  status: Status;
  createdAt: Date | null;
  lastLoginAt: Date | null;
}

export interface UserMethods {
  comparePassword: (password: string) => Promise<boolean>;
}

const userSchema = new Schema<UserSchema, Model<UserSchema>, UserMethods>({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 128,
    select: false,
  },
  status: {
    type: String,
    default: 'offline',
  },
  createdAt: {
    type: Date,
    default: null,
  },
  lastLoginAt: {
    type: Date,
    default: null,
  },
});

userSchema.pre('save', function createdAtUpdate(next) {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }

  next();
});

userSchema.pre('save', function encryptPassword(next) {
  if (!this.isModified('password') && !this.isNew) {
    return next();
  }

  const salt = bcrypt.genSaltSync(10);

  return bcrypt.hash(this.password, salt, (err, hash) => {
    if (err) {
      return next(err);
    }

    this.password = hash;

    return next();
  });
});

userSchema.method(
  'comparePassword',
  function comparePassword(password: string) {
    try {
      return bcrypt.compare(password, this.password);
    } catch (error) {
      return false;
    }
  },
);

export default mongoose.model('User', userSchema);
