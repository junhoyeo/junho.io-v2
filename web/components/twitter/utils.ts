import knownTweets from '@/tweets.json';

import { getTweets } from './twitter';
import type { TweetData } from './types';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
const KNOWN_TWEETS: Record<string, TweetData> = knownTweets as any;

export const cleanTwitterId = (tweetId: string) => {
  // eslint-disable-next-line prefer-named-capture-group
  const [id] = /(\d+)\/?$/.exec(tweetId.split('?')[0] || '') || [];
  return id;
};

export const extractTweetsFromBody = async (body: string) => {
  let tweetIds =
    body
      // eslint-disable-next-line prefer-named-capture-group
      .match(/tweetId="(.*?)"/g)
      ?.map((id) => id.slice(9, -1)) || [];

  tweetIds = tweetIds.flatMap((tweetId) => {
    const id = cleanTwitterId(tweetId);
    if (!id) {
      return [];
    }
    return id;
  });

  const unknownTweets = tweetIds.filter((id) => !KNOWN_TWEETS[id]);
  const tweets = [
    ...Object.values(KNOWN_TWEETS),
    ...(unknownTweets.length > 0
      ? await getTweets(unknownTweets)
      : ([] as TweetData[])),
  ];

  const tweetById = tweets.reduce<Record<string, TweetData>>((acc, tweet) => {
    acc[tweet.id] = tweet;
    return acc;
  }, {});

  return tweetById;
};
