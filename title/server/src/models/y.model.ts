import * as mongoose from 'mongoose';

const fuzzySearching = require('mongoose-fuzzy-searching');
const Schema = mongoose.Schema;
const ySchema = new Schema({
  tags: [
  	{
  		type: String,
  		required: true,
  		unique: true
  	}
  ],
  images: [
  	{
  		type: Schema.Types.ObjectId,
  		ref: 'mediaObject',
  		required: true,
  		unique: true
  	}
  ]});
ySchema.plugin(fuzzySearching, {fields: []});
export default mongoose.model('y', ySchema);
