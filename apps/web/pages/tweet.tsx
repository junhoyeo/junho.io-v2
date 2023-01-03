import styled from '@emotion/styled';
import { Breadcrumbs, Text, useTheme } from '@geist-ui/core';
import type { NextPage } from 'next';
import Link from 'next/link';

import { Layout } from '@/components/Layout';
import { Tweet, getTweets, type TweetData } from '@/components/twitter';

type Props = {
  title: string;
  tweets: TweetData[];
};

export const getStaticProps = async () => {
  try {
    const tweets = await getTweets([
      '1610227591931396096',
      '1610227598898114561',
      '1610227601192390657',
      '1610227603142742017',
      '1610228342892146688',
    ]);
    return {
      props: { title: '$ATOM != Cosmos Ecosystem', tweets: tweets.reverse() },
    };
  } catch (e) {
    console.error(e);
    return { props: [] };
  }
};

const capitalize = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);

const ExampleTweetRenderPage: NextPage<Props> = ({ title, tweets }) => {
  const { palette } = useTheme();

  const props = {
    type: 'blog',
  };

  return (
    <Layout>
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
          {title}
        </Breadcrumbs.Item>
      </Breadcrumbs>
      <Title h1>{title}</Title>
      <main style={{ maxWidth: 620, width: '100%', margin: '0 auto' }}>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} {...tweet} />
        ))}
      </main>
    </Layout>
  );
};
export default ExampleTweetRenderPage;

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
