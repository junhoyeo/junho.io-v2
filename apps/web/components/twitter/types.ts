export type TweetData = {
  type?: 'quoted';
  text: string;
  id: string;
  author: {
    username: string;
    name: string;
    profile_image_url: string;
    verified: boolean;
  };
  media?: {
    url: string;
    type: string;
    media_key: string;
    height: number;
    width: number;
  }[];
  created_at: string;
  public_metrics: {
    retweet_count: string;
    reply_count: string;
    like_count: string;
  };
  referenced_tweets?: TweetData[];
};
