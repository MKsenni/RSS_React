import { rest } from 'msw';
import { indexRoute, mockResults, person1, showRoute } from './data-mocks';

export const peopleHandlers = [
  rest.get(indexRoute, (_req, res, ctx) => {
    return res(ctx.json(mockResults), ctx.status(200));
  }),
  rest.get(showRoute, (_req, res, ctx) => {
    return res(ctx.json(person1), ctx.status(200));
  }),
];
