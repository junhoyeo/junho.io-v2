import styled from '@emotion/styled';
import { Breadcrumbs, Text, useTheme } from '@geist-ui/core';
import { Info } from '@geist-ui/icons';
import getXPath from 'get-xpath';
import { type NextPage } from 'next';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Layout } from '../components/Layout';
import {
  type UserComment,
  UserCommentCard,
} from '../components/UserCommentCard';
import { Header } from '../home/Header';

const MOCKED_CREATED_AT = new Date();
const MOCKED_USER = {
  displayName: 'Junho Yeo',
  avatarURL: 'https://github.com/junhoyeo.png',
};

const HomePage: NextPage = () => {
  const { palette } = useTheme();

  const [comments, setComments] = useState<UserComment[]>([]);

  useEffect(() => {
    const handleClick = (event: MouseEvent): void => {
      const element = event.target;
      if (element instanceof HTMLElement) {
        const xpath = getXPath(element);

        setComments((prev) => [
          ...prev,
          {
            uuid: uuidv4(),
            createdAt: MOCKED_CREATED_AT,
            user: MOCKED_USER,
            comment: 'Hello World',
            xpath,
          },
        ]);
      }
    };
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

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
            {comments.map((comment) => (
              <UserCommentCard key={comment.uuid} {...comment} />
            ))}
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
