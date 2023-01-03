import type { TweetData } from './types';

export const getTweets: (ids: string[]) => Promise<TweetData[]>;
