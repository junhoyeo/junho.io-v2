import { type NextPage } from 'next';

import {
  BlogPage,
  buildGetStaticPaths,
  buildGetStaticProps,
  type BlogPageProps,
} from '@/posts/components/BlogPage';
import type { PostCategoryType } from '@/posts/lib/types';

const POST_CATEGORY_TYPE: PostCategoryType = 'blog';

const Page: NextPage<BlogPageProps> = (props) => <BlogPage {...props} />;
export default Page;

export const getStaticProps = buildGetStaticProps(POST_CATEGORY_TYPE);
export const getStaticPaths = buildGetStaticPaths(POST_CATEGORY_TYPE);
