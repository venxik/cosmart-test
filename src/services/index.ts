import { booksApi } from './query';

export const combinedMiddleware = [booksApi.middleware];

export * from './query';
