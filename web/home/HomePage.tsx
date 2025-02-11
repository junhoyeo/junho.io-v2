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
      <LazyMotion features={domAnimation}>
        <Title {...animation(64, 0)}>
          @junhoyeo <br />
          Sailing Toward <br />
          The{' '}
          <span style={{ marginTop: -16, marginBottom: -16 }}>
            <UnicornBadge>
              <UnicornEmoji
                alt=""
                src={unicornImage}
                width={256}
                height={256}
                unoptimized
              />
              Future
            </UnicornBadge>
          </span>
        </Title>
        <Description {...animation(64, 0.2)}>
          I mostly code 24/7 and just like to hack, build, and ship
          mind-breaking things.
        </Description>
        <m.div {...animation(48, 0.4)}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              placeItems: 'center',
              marginTop: 32,
            }}
          >
            <Link href="/about">
              <Button
                style={{
                  borderRadius: 64,
                  fontWeight: 'bold',
                  fontSize: 20,
                  height: 56,
                  paddingLeft: 42,
                  paddingRight: 42,
                }}
              >
                Learn More
              </Button>
            </Link>
            <SocialButtonList style={{ marginTop: 16 }} />
          </div>
        </m.div>
      </LazyMotion>
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
