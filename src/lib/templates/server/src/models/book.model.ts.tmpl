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
  isPublished: Boolean,
  publishedAt: {
    type: Date,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  collaborators: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user'
    }
  ],
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
  tags: [
    {
      type: String
    }
  ],
  pagesForReview: [
    {
      type: Number
    }
  ],
  datesForReview: [
    {
      type: Date
    }
  ]
}, {timestamps: true});
bookSchema.plugin(fuzzySearching, {fields: ['title']});
export default mongoose.model('book', bookSchema);
