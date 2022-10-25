import styled from '@emotion/styled';
import { Breadcrumbs, Card, Text, User, useTheme } from '@geist-ui/core';
import { Info } from '@geist-ui/icons';
import { type NextPage } from 'next';

import { Layout } from '../components/Layout';
import { Header } from '../home/Header';

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
            <Card shadow>
              <User name="Junho Yeo" src="https://github.com/junhoyeo.png">
                8 minutes ago
              </User>
              <Text font="14px" p>
                Wow
              </Text>
            </Card>
            <Card>
              <User name="Junho Yeo" src="https://github.com/junhoyeo.png">
                8 minutes ago
              </User>
              <Text font="14px" p>
                Wow
              </Text>
            </Card>
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
