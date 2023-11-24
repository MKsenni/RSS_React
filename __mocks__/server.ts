import { setupServer } from 'msw/node';
import { peopleHandlers } from './handlers';

export const server = setupServer(...peopleHandlers);
