import styled from '@emotion/styled';
import { Breadcrumbs, Text, useTheme } from '@geist-ui/core';
import { type NextPage } from 'next';
import Link from 'next/link';
import { useEffect } from 'react';

import { Layout } from '@/components/Layout';
import { PostList } from '@/components/PostList';
import { Head, defaultMeta } from '@/about/components/head';
import { Analytics } from '@/utils/analytics';

const BlogListPage: NextPage = () => {
  const { palette } = useTheme();

  useEffect(() => {
    Analytics.logEvent('view_blog_list', undefined);
  }, []);

  return (
    <Layout>
      <Head meta={{ ...defaultMeta, title: 'Blog' }} />
      <Breadcrumbs>
        <Link href="/" style={{ color: palette.accents_5 }}>
          <Breadcrumbs.Item>Paracøsm</Breadcrumbs.Item>
        </Link>
        <Breadcrumbs.Item href="#">Blog</Breadcrumbs.Item>
      </Breadcrumbs>
      <Title h1>Blog</Title>
      <PostList />
    </Layout>
  );
};

export default BlogListPage;

const Title = styled(Text)`
  margin-top: 42px;

  font-weight: 900;
  line-height: 1.25;
  margin-bottom: 1.5rem;

  @media screen and (max-width: 600px) {
    margin-top: 24px;
    font-size: 36px;
  }

  @media screen and (max-width: 400px) {
    font-size: 32px;
  }
`;
