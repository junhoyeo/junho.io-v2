import styled from '@emotion/styled';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { Head } from '@/about/components/head';
import { Footer } from '@/components/Footer';
import { SocialButtonList } from '@/components/SocialButtonList';

import unicornGradient from './assets/unicorn-gradient.jpg';
import unicornImage from './assets/unicorn.png';
import { FeaturedCard } from './components/FeaturedCard';

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
          JUNHO YEO <br />
          SAILING TOWARD <br />
          THE{' '}
          <UnicornEmoji
            alt="unicorn"
            src={unicornImage}
            width={192}
            height={192}
            unoptimized
          />{' '}
          FUTURE
        </Title>
        <Description {...animation(64, 0.2)}>
          <ol>
            <li>① POSITION IN THE BEST ENVIRONMENT</li>
            <li>② DEVELOP MY OWN THESIS</li>
            <li>③ PROTOTYPE AND BUILD PRODUCTS</li>
          </ol>
        </Description>
        <m.div {...animation(48, 0.4)}>
          <SocialButtonList style={{ marginTop: 16 }} />
        </m.div>

        <FeaturedList {...animation(48, 0.6)}>
          <Link href="/w/the-life-cycle-of-appchains" style={{ flex: 1 }}>
            <FeaturedCard
              badges={['Just Released']}
              title="앱체인 생애주기"
              description="레이어 1 블록체인들이 어떤 모습으로 성장해야 하는지에 대해서"
              image={unicornGradient}
              dark
              language="ko"
            />
          </Link>
          <Link href="/about" style={{ flex: 1 }}>
            <FeaturedCard
              title="About"
              description="Welcome to my site. I'm a 19-yo generalist hacker, shaping the 2nd/3rd web. Sometimes a designer and dreamer, I just like to build things. Now I'm preparing the infrastructure—insight, followers, and capital—for a bigger dream."
              language="en"
            />
          </Link>
        </FeaturedList>
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
  font-size: 3rem;
  text-align: center;
  line-height: 120%;
`;
const UnicornEmoji = styled(Image)`
  margin-bottom: 4px;
  height: 3.2rem;
  width: 3.2rem;
  display: inline-block;
  vertical-align: text-bottom;

  user-select: none;
  -webkit-user-drag: none;
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

const FeaturedList = styled(m.div)`
  margin: 64px 0 0;
  padding: 0;

  width: 100%;
  max-width: 1080px;

  display: flex;
  flex-wrap: wrap;
  gap: 16px;

  @media (max-width: 1120px) {
    flex-direction: column;
  }
`;
