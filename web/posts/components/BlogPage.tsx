import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Breadcrumbs, Text, useTheme } from '@geist-ui/core';
import { format, formatDistance } from 'date-fns';
import { type GetStaticPaths, type GetStaticProps } from 'next';
import { serialize } from 'next-mdx-remote/serialize';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import rehypeMeta from 'rehype-meta';
// eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error, @typescript-eslint/ban-ts-comment
// @ts-ignore
import removeMarkdown from 'remove-markdown';
import { defaultMeta } from '@/about/components/head';
import { Footer } from '@/components/Footer';
import { MDXRenderer } from '@/components/mdx-renderer';
import { extractTweetsFromBody } from '@/components/twitter/utils';
import { Analytics } from '@/utils/analytics';
import { capitalize } from '@/utils/casing';
import {
  rehypeExtractHeadings,
  type Heading,
} from '../lib/rehype-extract-headings';
import { rehypeTransformSlug } from '../lib/rehype-transform-slug';
import type { Post, PostCategoryType, PostDocument } from '../lib/types';
import { ToC } from './ToC';

export type BlogPageProps = PostDocument & {
  headings: Heading[];
};

export const BlogPage: React.FC<BlogPageProps> = (props: BlogPageProps) => {
  const { palette } = useTheme();
  const {
    query: { slug },
  } = useRouter();

  useEffect(() => {
    Analytics.logEvent('view_blog_post', {
      slug: (slug as string[]).join('/'),
      title: props.meta.title,
    });
  }, [props, slug]);

  const hasToc = useMemo(
    () => props.headings.length > 0,
    [props.headings.length],
  );

  const timestamp = useMemo(
    () => ({
      date: !props.meta.date
        ? null
        : format(new Date(props.meta.date), 'MMM d, yyyy'),
      relative: !props.meta.date
        ? null
        : capitalize(
            formatDistance(new Date(props.meta.date), new Date(), {
              addSuffix: true,
            }),
          ),
    }),
    [props.meta.date],
  );

  return (
    <>
      <Wrapper>
        <Container hasToc={hasToc}>
          <Breadcrumbs>
            <Link href="/" style={{ color: palette.accents_5 }}>
              <Breadcrumbs.Item>Paracøsm</Breadcrumbs.Item>
            </Link>
            <Link href={`/${props.type}`} style={{ color: palette.accents_5 }}>
              <Breadcrumbs.Item>{capitalize(props.type)}</Breadcrumbs.Item>
            </Link>
            <Breadcrumbs.Item
              href="#"
              style={{
                display: 'inline-block',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }}
            >
              {props.meta.emoji} {props.meta.title}
            </Breadcrumbs.Item>
          </Breadcrumbs>
          <Title h1>
            {props.meta.emoji} {props.meta.title}
          </Title>
          <Timestamp>
            {timestamp.date ? (
              <span style={{ color: '#696970', fontWeight: 'bold' }}>
                {timestamp.date}
              </span>
            ) : null}
            {timestamp.relative ? (
              <span style={{ color: '#7a7a91' }}>{timestamp.relative}</span>
            ) : null}
          </Timestamp>
          <Main>
            <MDXRenderer {...props} />
          </Main>
        </Container>
        {hasToc ? <ToC headings={props.headings} /> : null}
      </Wrapper>
      <Footer />
    </>
  );
};

const Wrapper = styled.div`
  padding: 120px 20px 96px;
  width: 100%;

  display: flex;
  justify-content: center;
  gap: 32px;

  position: relative;

  @media (max-width: 960px) {
    #toc {
      display: none;
    }
  }
`;
const Container = styled.div<{ hasToc: boolean }>`
  max-width: 800px;
  width: 100%;

  display: flex;
  flex-direction: column;

  ${({ hasToc }) =>
    hasToc &&
    css`
      margin-left: 272px;

      @media (max-width: 1400px) {
        margin-left: 0;
      }

      @media (max-width: 1200px) {
        max-width: 620px;
      }

      @media (max-width: 960px) {
        max-width: 800px;
      }
    `}
`;

const Title = styled(Text)`
  margin-top: 42px;
  text-align: center;

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
const Timestamp = styled.span`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

const Main = styled.main`
  img {
    margin: 0 auto;
    display: flex;
    border-radius: 8px;
    width: 100%;
  }
`;

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint, @typescript-eslint/no-explicit-any
export const withCache = <ReturnType extends any, Params extends any[]>(
  fetcher: (...params: Params) => ReturnType,
): ((...params: Params) => ReturnType) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cache: Record<string, any> = {};
  return (...params: Params) => {
    const key = JSON.stringify(params);

    if (cache[key]) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return cache[key];
    }

    if (!cache[key]) {
      cache[key] = null;
    }

    cache[key] = null;
    cache[key] = fetcher(...params);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return cache[key];
  };
};
const getPosts = withCache((type: PostCategoryType) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const md = require('@/posts/lib/get-posts') as {
    getPosts: (type: PostCategoryType) => Post[];
  };

  return md.getPosts(type);
});

export const buildGetStaticProps: (type: PostCategoryType) => GetStaticProps =
  (type) =>
  async ({ params }) => {
    const slug = ((params?.slug || []) as string[]).join('/');

    const posts = getPosts(type);
    const postIndex = posts.findIndex((p) => p.slug === slug);
    const post = posts[postIndex];

    if (!post) {
      return {
        notFound: true,
      };
    }

    const { body, ...meta } = post;

    const descriptionFromBodySize = 210 - (meta.description?.length || 0);
    const descriptionFromBody =
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      `${(removeMarkdown(body) as string)
        .trim()
        .replaceAll('\n', ' ')
        .replaceAll('  ', ' ')
        .slice(0, descriptionFromBodySize)}…`;

    const description = `${
      meta.description ? `${meta.description} | ` : ''
    }${descriptionFromBody}`;

    console.log({ description });

    const headings: Heading[] = [];
    const [serializedResult, tweetById] = await Promise.all([
      serialize(body, {
        parseFrontmatter: true,
        mdxOptions: {
          development: false,
          rehypePlugins: [
            rehypeTransformSlug,
            [rehypeExtractHeadings, { rank: 2, headings }],
            [
              rehypeMeta,
              {
                ...defaultMeta,
                og: true,
                twitter: true,
                copyright: true,
                type: 'article',
                title: `${meta.emoji ? `${meta.emoji} ` : ''}${meta.title}`,
                description,
                siteAuthor: 'Junho Yeo',
                siteTwitter: '@_junhoyeo',
              },
            ],
          ],
        },
      }),
      extractTweetsFromBody(body),
    ]);

    return {
      props: {
        meta: { ...meta, description },
        type,
        headings,
        tweets: tweetById,
        ...serializedResult,
      },
    };
  };

export const buildGetStaticPaths: (type: PostCategoryType) => GetStaticPaths =
  (type) => () => ({
    paths: getPosts(type).map((p) => ({
      params: { slug: !p.slug ? [''] : p.slug.split('/') },
    })),
    fallback: false,
  });
