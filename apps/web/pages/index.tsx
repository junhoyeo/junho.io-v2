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
          <Info
            size={20}
            style={{
              marginRight: 8,
              display: 'inline-block',
              verticalAlign: 'text-bottom',
            }}
          />

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
