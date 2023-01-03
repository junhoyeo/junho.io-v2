import type { NextPage } from 'next';

import { Layout } from '@/components/Layout';
import { Tweet, getTweets, type TweetData } from '@/components/twitter';

type Props = {
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
    return { props: { tweets: tweets.reverse() } };
  } catch (e) {
    console.error(e);
    return { props: [] };
  }
};

const ExampleTweetRenderPage: NextPage<Props> = ({ tweets }) => {
  return (
    <Layout>
      <main>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} {...tweet} />
        ))}
      </main>
    </Layout>
  );
};
export default ExampleTweetRenderPage;
