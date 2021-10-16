import * as mongoose from 'mongoose';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import * as crypto from 'crypto';

const fuzzySearching = require('mongoose-fuzzy-searching');

const Schema = mongoose.Schema;
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: 'role',
    required: true,
  },
  display: {
    type: Schema.Types.ObjectId,
    ref: 'mediaObject'
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  salt: {
    type: String,
    required: true
  },
  hash: {
    type: String,
    required: true
  }
}, {timestamps: true});

userSchema.virtual('password')
  .set(function (password: any) {
    if (password) {
      const user: any = this;
      user.salt = crypto.randomBytes(16).toString('hex');
      user.hash = getHashedPassword(password, user.salt);
    }
  })
  .get(function () {
    const user: any = this;

    return user.hash;
  });

userSchema.set('toJSON', {
  transform: (doc: any, ret: any) => {
    delete ret.__v;
    delete ret.salt;
    delete ret.hash;

    return ret;
  }
});

userSchema.methods.validPassword = function (password: any): boolean {
  const user: any = this;
  const hash = getHashedPassword(password, user.salt);
  return user.hash === hash;
};

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
userSchema.methods.validateJWT = function (token: string): null | JwtPayload | string {
  return jwt.decode(token);
};

userSchema.methods.generateJWT = async function (): Promise<string> {
  const expiry = new Date();
  const jwtExpiration = parseInt(process.env.JWT_EXPIRATION, 10);
  expiry.setDate(expiry.getDate() + jwtExpiration);
  const user: any = this;
  return jwt.sign({
    _id: user._id,
    email: user.email,
    name: user.name,
    role: user.role.name,
    exp: ~~(expiry.getTime() / 1000)
  }, process.env.secret);
};

const getHashedPassword = (password: string, salt: string): string => {
  return crypto.pbkdf2Sync(password, salt, 1000, 256, 'sha256').toString('hex');
};

userSchema.plugin(fuzzySearching, {fields: ['email', 'name']});

export default mongoose.model('user', userSchema);
