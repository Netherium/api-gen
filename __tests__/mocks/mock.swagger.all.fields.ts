import { UIEntity } from '../../src/lib/interfaces/ui.entity.model';

export const MockSwaggerAllFields: UIEntity[] =
  [
    {
      name: 'book',
      capitalizedName: 'Book',
      fields: [
        {
          name: 'title',
          type: 'String',
          required: true
        },
        {
          name: 'isbn',
          type: 'Number',
          unique: true
        },
        {
          name: 'author',
          type: 'ObjectId',
          ref: 'user',
          required: true
        },
        {
          name: 'publishAt',
          type: 'Date'
        },
        {
          name: 'isPublished',
          type: 'Boolean'
        },
        {
          name: 'tags',
          type: 'Array'
        }
      ],
      timestamps: true,
      populate: true
    },
    {
      name: 'post',
      capitalizedName: 'Post',
      fields: [
        {
          name: 'content',
          type: 'String',
        },
      ],
      timestamps: false,
      populate: false
    }
  ];

