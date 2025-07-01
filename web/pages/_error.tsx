import styled from '@emotion/styled';
import { type NextPage } from 'next';

import { Layout } from '@/components/Layout';

type Props = {
  statusCode: number;
};

const ErrorPage: NextPage<Props> = ({ statusCode }) => {
  return (
    <Layout>
      <ErrorTitle>{statusCode}</ErrorTitle>
    </Layout>
  );
};

const ErrorTitle = styled.h1`
  font-size: 48px;
  font-weight: 900;
  text-align: center;
  margin: 48px 0;
`;

ErrorPage.getInitialProps = ({ res, err }): Props => {
  const statusCode = res?.statusCode || err?.statusCode || 404;
  return { statusCode };
};

export default ErrorPage;
