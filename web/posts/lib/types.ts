import { type MDXRemoteSerializeResult } from 'next-mdx-remote';
import type { TweetData } from '@/components/twitter';

export type PostCategoryType = 'blog';

export type PostSummary = {
  emoji?: string;
  title: string;
  slug: string;
  description?: string;
  date?: string;
  published?: boolean;
};

export type Post = PostSummary & {
  body: string;
};

export type PostDocument = MDXRemoteSerializeResult & {
  type: PostCategoryType;
  meta: Omit<Post, 'body'>;
  tweets: Record<string, TweetData>;
};
