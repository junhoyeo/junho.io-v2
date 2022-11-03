import { Text } from '@geist-ui/core';
import { type NextPage } from 'next';

import { Layout } from '../components/Layout';

type Props = {
  statusCode: number;
};

const ErrorPage: NextPage<Props> = ({ statusCode }) => {
  return (
    <Layout defaultPostListProps={{ initialExpand: true }}>
      <Text h1>{statusCode}</Text>
    </Layout>
  );
};

ErrorPage.getInitialProps = ({ res, err }): Props => {
  const statusCode = res?.statusCode || err?.statusCode || 404;
  return { statusCode };
};

export default ErrorPage;
