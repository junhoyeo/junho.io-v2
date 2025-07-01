import styled from '@emotion/styled';
import { type NextPage } from 'next';
import Link from 'next/link';
import { useEffect } from 'react';

import { Head, defaultMeta } from '@/about/components/head';
import { Layout } from '@/components/Layout';
import { PostList } from '@/components/PostList';
import { Analytics } from '@/utils/analytics';
import { colors } from '@/styles/colors';

const BlogListPage: NextPage = () => {
  useEffect(() => {
    Analytics.logEvent('view_blog_list', undefined);
  }, []);

  return (
    <Layout>
      <Head meta={{ ...defaultMeta, title: 'Blog' }} />
      <BreadcrumbsContainer>
        <Link href="/">
          <BreadcrumbItem>Paracøsm</BreadcrumbItem>
        </Link>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbItem $active>Blog</BreadcrumbItem>
      </BreadcrumbsContainer>
      <Title>Blog</Title>
      <PostList />
    </Layout>
  );
};

export default BlogListPage;

const BreadcrumbsContainer = styled.nav`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

const BreadcrumbItem = styled.span<{ $active?: boolean }>`
  color: ${props => props.$active ? colors.foreground : colors.accents_5};
  font-size: 14px;
`;

const BreadcrumbSeparator = styled.span`
  color: ${colors.accents_4};
  font-size: 14px;
`;

const Title = styled.h1`
  margin-top: 42px;
  font-size: 48px;
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
