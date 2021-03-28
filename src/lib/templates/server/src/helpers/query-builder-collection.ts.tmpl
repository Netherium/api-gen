import { Request } from 'express';
import { Model, QueryPopulateOptions } from 'mongoose';

export const queryBuilderCollection = async (req: Request, model: Model<any>, populateOptions: QueryPopulateOptions[] = []) => {
  let limit = 10;
  let page = 1;
  let query = model.find();
  let hasFuzzySearch = false;
  if (Object.keys(req.query).length > 0) {
    if (req.query.q && typeof req.query.q !== 'undefined') {
      hasFuzzySearch = true;
      // @ts-ignore
      query = model.fuzzySearch(req.query.q);
      delete req.query.q;
    }
    for (const [queryParam, paramValue] of Object.entries(req.query)) {
      let searchField: string;
      switch (true) {
        case queryParam.endsWith('_eq'):
          searchField = queryParam.slice(0, -3);
          query = query.where(searchField).equals(paramValue);
          break;
        case queryParam.endsWith('_ne'):
          searchField = queryParam.slice(0, -3);
          query = query.where(searchField).ne(paramValue);
          break;
        case queryParam.endsWith('_lt'):
          searchField = queryParam.slice(0, -3);
          query = query.where(searchField).lt(+paramValue);
          break;
        case queryParam.endsWith('_lte'):
          searchField = queryParam.slice(0, -4);
          query = query.where(searchField).lte(+paramValue);
          break;
        case queryParam.endsWith('_gt'):
          searchField = queryParam.slice(0, -3);
          query = query.where(searchField).gt(+paramValue);
          break;
        case queryParam.endsWith('_gte'):
          searchField = queryParam.slice(0, -4);
          query = query.where(searchField).gte(+paramValue);
          break;
        case queryParam === '_sort':
          query = query.sort(paramValue);
          break;
        case queryParam === '_limit':
          limit = parseInt(paramValue as string, 10);
          break;
        case queryParam === '_page':
          page = parseInt(paramValue as string, 10);
          break;
      }
    }

  }
  if (limit > 0) {
    query = query.limit(limit);
  }

  if (page > 0 && limit > 0) {
    query = query.skip((page - 1) * limit);
  }

  if (populateOptions !== []) {
    for (const populateOption of populateOptions) {
      query = query.populate(populateOption);
    }
  }
  const results = await query.exec();
  const total = hasFuzzySearch ? results.length : await model.countDocuments();
  return {
    totalItems: total,
    data: results
  };
};
