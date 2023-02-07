import styled from '@emotion/styled';
import { Spacer } from '@geist-ui/core';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import type { NextPage } from 'next';
import Image from 'next/image';

import { Head } from '@/about/components/head';
import { Footer } from '@/components/Footer';
import { SocialButtonList } from '@/components/SocialButtonList';

import unicornImage from './assets/unicorn.png';

const HomePage: NextPage = () => {
  return (
    <Container>
      <Head />
      <LazyMotion features={domAnimation}>
        <Title
          initial={{ transform: 'translate3d(0, 64px, 0)', opacity: 0 }}
          animate={{ transform: 'translate3d(0, 0px, 0)', opacity: 1 }}
          exit={{ transform: 'translate3d(0, 64px, 0)', opacity: 0 }}
          transition={{ type: 'spring' }}
        >
          JUNHO YEO <br />
          SAILING TOWARD <br />
          THE{' '}
          <Image
            alt="unicorn"
            src={unicornImage}
            width={192}
            height={192}
            unoptimized
          />{' '}
          FUTURE
        </Title>
        <Description
          initial={{ transform: 'translate3d(0, 64px, 0)', opacity: 0 }}
          animate={{ transform: 'translate3d(0, 0px, 0)', opacity: 1 }}
          exit={{ transform: 'translate3d(0, 64px, 0)', opacity: 0 }}
          transition={{ type: 'spring', delay: 0.2 }}
        >
          <ol>
            <li>① POSITION IN THE BEST ENVIRONMENT</li>
            <li>② DEVELOP MY OWN THESIS</li>
            <li>③ PROTOTYPE AND BUILD PRODUCTS</li>
          </ol>
        </Description>
        <m.div
          initial={{ transform: 'translate3d(0, 48px, 0)', opacity: 0 }}
          animate={{ transform: 'translate3d(0, 0px, 0)', opacity: 1 }}
          exit={{ transform: 'translate3d(0, 48px, 0)', opacity: 0 }}
          transition={{ type: 'spring', delay: 0.4 }}
        >
          <SocialButtonList style={{ marginTop: 16 }} />
        </m.div>
      </LazyMotion>

      <Spacer height={8} />

      <Footer />
    </Container>
  );
};

export default HomePage;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled(m.h1)`
  margin: 120px 0 12px;
  font-size: 3rem;
  text-align: center;
  line-height: 120%;

  img {
    margin-bottom: 4px;
    height: 3.2rem;
    width: 3.2rem;
    display: inline-block;
    vertical-align: text-bottom;
  }
`;
const Description = styled(m.ol)`
  margin: 0;
  font-size: 18px;

  &,
  li {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
`;
