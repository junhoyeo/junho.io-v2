import styled from '@emotion/styled';
import { Button } from '@geist-ui/core';
import { domAnimation, LazyMotion, m } from 'framer-motion';
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Head } from '@/about/components/head';
import { Footer } from '@/components/Footer';
import { SocialButtonList } from '@/components/SocialButtonList';
import unicornImage from './assets/unicorn.png';

const animation = (y: 48 | 64, delay: number) => ({
  initial: { transform: `translate3d(0, ${y}px, 0)`, opacity: 0 },
  animate: { transform: 'translate3d(0, 0px, 0)', opacity: 1 },
  exit: { transform: `translate3d(0, ${y}px, 0)`, opacity: 0 },
  transition: { type: 'spring', delay },
});

const HomePage: NextPage = () => {
  return (
    <Container>
      <Head />
      <Spacer />
      <Footer />
    </Container>
  );
};

export default HomePage;

const Container = styled.div`
  padding: 0 20px;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Spacer = styled.div`
  width: 100%;
  height: 120px;
`;

const Title = styled(m.h1)`
  margin: 0 0 12px;
  font-size: 2.8rem;
  text-align: center;
  line-height: 110%;
`;
const UnicornEmoji = styled(Image)`
  height: 48px;
  width: 48px;
  display: inline-block;
  vertical-align: text-bottom;

  user-select: none;
  -webkit-user-drag: none;
`;
const Description = styled(m.p)`
  margin: 0;
  font-size: 18px;
  white-space: break-spaces;
  text-align: center;
`;
const UnicornBadge = styled.span`
  margin: -8px 0;
  padding: 4px 0;
  padding-left: 10px;
  padding-right: 16px;

  background: linear-gradient(
    to bottom,
    rgba(236, 210, 255, 0.85),
    rgba(255, 130, 255, 1)
  );
  backdrop-filter: blur(8px);
  border-radius: 32px;

  color: black;
  line-height: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  vertical-align: sub;
`;
