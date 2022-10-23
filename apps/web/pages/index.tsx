import styled from '@emotion/styled';
import { Text, useTheme } from '@geist-ui/core';
import { Info } from '@geist-ui/icons';
import { type NextPage } from 'next';

import { Layout } from '../components/Layout';
import { Header } from '../home/Header';

const HomePage: NextPage = () => {
  const { palette } = useTheme();

  return (
    <>
      <Header />

      <Layout>
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
            having its own geography, history, and language, which may
            incorporate real-world or fictitious characters and conventions.
          </Text>
        </Text>
      </Layout>
    </>
  );
};

export default HomePage;

const InfoIcon = styled(Info)`
  margin-right: 8px;
  display: inline-block;
  vertical-align: text-bottom;
`;
