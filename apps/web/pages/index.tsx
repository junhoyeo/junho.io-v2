import styled from '@emotion/styled';
import { Breadcrumbs, Text, useTheme } from '@geist-ui/core';
import { Info } from '@geist-ui/icons';
import { type NextPage } from 'next';

import { Layout } from '../components/Layout';
import { UserCommentCard } from '../components/UserCommentCard';
import { Header } from '../home/Header';

const MOCKED_CREATED_AT = new Date();
const MOCKED_USER = {
  displayName: 'Junho Yeo',
  avatarURL: 'https://github.com/junhoyeo.png',
};

const HomePage: NextPage = () => {
  const { palette } = useTheme();

  return (
    <Layout
      header={<Header />}
      leftContent={<div />}
      rightContent={
        <>
          <Breadcrumbs>
            <Breadcrumbs.Item>Paracosm</Breadcrumbs.Item>
            <Breadcrumbs.Item>Home</Breadcrumbs.Item>
          </Breadcrumbs>

          <div
            style={{
              marginTop: 16,
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            <UserCommentCard
              comment="Wow, awesome!"
              createdAt={MOCKED_CREATED_AT}
              user={MOCKED_USER}
            />
            <UserCommentCard
              comment="Wow, awesome!"
              createdAt={MOCKED_CREATED_AT}
              user={MOCKED_USER}
            />
            <UserCommentCard
              comment="Wow, awesome!"
              createdAt={MOCKED_CREATED_AT}
              user={MOCKED_USER}
            />
          </div>
        </>
      }
    >
      <Text blockquote>
        <InfoIcon size={20} />

        <Text span style={{ color: palette.accents_6 }}>
          A{' '}
          <Text b i span style={{ color: palette.accents_8 }}>
            paracosm
          </Text>{' '}
          is{' '}
          <Text span style={{ color: palette.accents_8 }}>
            a detailed imaginary world
          </Text>{' '}
          having its own geography, history, and language, which may incorporate
          real-world or fictitious characters and conventions.
        </Text>
      </Text>
    </Layout>
  );
};

export default HomePage;

const InfoIcon = styled(Info)`
  margin-right: 8px;
  display: inline-block;
  vertical-align: text-bottom;
`;
