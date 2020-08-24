import * as mongoose from 'mongoose';

const fuzzySearching = require('mongoose-fuzzy-searching');

const Schema = mongoose.Schema;
const resourcePermissionSchema = new Schema({
  resourceName: {
    type: String,
    required: true,
    unique: true
  },
  methods: [
    {
      _id: false,
      name: String,
      roles: [
        {
          type: Schema.Types.ObjectId,
          ref: 'role',
          required: true
        }
      ],
    }
  ]
}, {timestamps: true});

resourcePermissionSchema.plugin(fuzzySearching, {fields: ['resourceName']});

export default mongoose.model('resourcePermission', resourcePermissionSchema);
