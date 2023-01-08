import { getTweets } from './twitter';
import type { TweetData } from './types';

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

  const tweets =
    tweetIds.length > 0 ? await getTweets(tweetIds) : ([] as TweetData[]);

  const tweetById = tweets.reduce<Record<string, TweetData>>((acc, tweet) => {
    acc[tweet.id] = tweet;
    return acc;
  }, {});

  return tweetById;
};
