import * as mongoose from 'mongoose';
import * as jwt from 'jsonwebtoken';
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
      user.hash = crypto.pbkdf2Sync(password, user.salt, 1000, 256, 'sha256').toString('hex');
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

// tslint:disable:only-arrow-functions
userSchema.methods.validPassword = function (password: any) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 256, 'sha256').toString('hex');
  return this.hash === hash;
};

userSchema.methods.validateJWT = function (token: string) {
  return jwt.decode(token);
};

userSchema.methods.generateJWT = async function () {
  const expiry = new Date();
  expiry.setDate(parseInt(expiry.getDate() + process.env.JWT_EXPIRATION, 10));
  const user: any = this;
  return jwt.sign({
    _id: user._id,
    email: user.email,
    name: user.name,
    role: user.role.name,
    // tslint:disable-next-line:no-bitwise
    exp: ~~(expiry.getTime() / 1000)
  }, process.env.secret);
};

userSchema.plugin(fuzzySearching, {fields: ['email', 'name']});

export default mongoose.model('user', userSchema);
