import * as mongoose from 'mongoose';

const fuzzySearching = require('mongoose-fuzzy-searching');

const Schema = mongoose.Schema;
const bookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  isbn: {
    type: Number,
    required: true,
    unique: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  isPublished: Boolean,
  cover: {
    type: Schema.Types.ObjectId,
    ref: 'mediaObject'
  },
  images: [
    {
      type: Schema.Types.ObjectId,
      ref: 'mediaObject'
    }
  ],
  publishedAt: {
    type: Date,
    required: true
  },
  tags: [
    {
      type: String
    }
  ]
}, {timestamps: true});

bookSchema.plugin(fuzzySearching, {fields: ['title']});

export default mongoose.model('book', bookSchema);
