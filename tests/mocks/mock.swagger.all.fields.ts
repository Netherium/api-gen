import { UIEntity } from '../../src/lib/interfaces/ui-entity.model';

export const MockSwaggerAllFields: UIEntity[] =
  [
    {
      name: 'book',
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
          type: [
            {
              type: 'String'
            }
          ]
        },
        {
          name: 'arrayOfNumbers',
          type: [
            {
              type: 'Number'
            }
          ]
        },
        {
          name: 'arrayOfDates',
          type: [
            {
              type: 'Date'
            }
          ]
        },
        {
          name: 'arrayOfBoolean',
          type: [
            {
              type: 'Boolean'
            }
          ]
        },
        {
          name: 'arrayOfObjects',
          type: [
            {
              type: 'ObjectId',
              ref: 'user',
            }
          ]
        }
      ],
      timestamps: true,
      populate: true
    },
    {
      name: 'post',
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

