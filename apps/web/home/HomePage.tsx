import styled from '@emotion/styled';
import { type NextPage } from 'next';

import '@junhoyeo/iphone/dist/style.css';

import { useTheme } from '@geist-ui/core';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '@junhoyeo/iphone';
import { useEffect, useRef, useState } from 'react';

import { NavigationBar } from '@/components/NavigationBar';
import { MDXRenderer } from '@/components/mdx-renderer';
import { PhoneInstance } from '@/components/phone-instance';
import { useWindowSize } from '@/hooks/use-window-size';
import { type PostDocument } from '@/posts/lib/types';

import { Head } from './components/head';

const HomePage: NextPage<PostDocument> = (props) => {
  const { palette } = useTheme();
  const { screenWidth = 1980 } = useWindowSize();

  const [transformScale, setTransformScale] = useState<number>(1);

  useEffect(() => {
    if (screenWidth > 500) {
      setTransformScale(0.85);
      return;
    }
    const containerWidth = screenWidth * 0.9;

    let scale = containerWidth / DEVICE_WIDTH;
    scale = Math.min(scale, 0.85);
    setTransformScale(scale);
  }, [screenWidth]);

  const phoneContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!phoneContainerRef.current) {
      return;
    }
    const deviceHeight = transformScale * DEVICE_HEIGHT;
    const bottom = deviceHeight * -0.45;
    document.documentElement.style.setProperty(
      '--device-height',
      `${deviceHeight}px`,
    );
    document.documentElement.style.setProperty('--bottom', `${bottom}px`);
  });

  return (
    <Wrapper>
      <Head />
      <NavigationBar />

      <Container>
        <Title style={{ color: palette.accents_7 }}>
          {`Hi, I'm `}
          <span>Junho Yeo</span>
        </Title>
        <Description style={{ color: palette.accents_6 }}>
          {`Welcome to my site. I'm a 19-yo generalist hacker, shaping the 2nd/3rd
          web. Sometimes a designer and dreamer, I just like to build things.
          Now I'm preparing the infrastructure—insight, followers, and
          capital—for a bigger dream.`}
        </Description>
        <main>
          <MDXRenderer {...props} />
        </main>
      </Container>
      <PhoneContainer ref={phoneContainerRef}>
        <PhoneInstance
          transformScale={transformScale}
          dynamicIslandProps={{
            default: 'default',
            state: 'default',
            setState: () => {},
            onClick: () => {},
          }}
        />
      </PhoneContainer>
    </Wrapper>
  );
};

export default HomePage;

const Wrapper = styled.div`
  display: flex;
  margin: 0 auto;
  min-height: 100vh;
  max-width: 1080px;
  position: relative;

  @media screen and (max-width: 1200px) {
    max-width: 900px;
  }

  @media screen and (max-width: 1100px) {
    max-width: 850px;
  }

  @media screen and (max-width: 1000px) {
    max-width: 75%;
    flex-direction: column;

    margin-bottom: 300px;
  }

  @media screen and (max-width: 500px) {
    max-width: 90%;
  }
`;
const Container = styled.div`
  margin-right: 32px;
  padding-top: 120px;
  flex: 1;

  display: flex;
  flex-direction: column;

  @media screen and (max-width: 1000px) {
    margin-right: 0;
    width: 100%;
  }

  main {
    padding-bottom: 120px;
  }
`;

const Title = styled.h1`
  margin: 0;
  margin-bottom: 28px;

  font-weight: 800;
  font-size: 2rem;
  line-height: 1.25;
  letter-spacing: -0.25px;
`;
const Description = styled.p`
  margin: 0;
  margin-bottom: 20px;

  font-weight: 400;
  font-size: 18px;
  padding-bottom: 0.56rem;
  line-height: 1.45;
`;

const PhoneContainer = styled.div`
  position: sticky;
  top: 0;
  right: 0;
  height: 100vh;
  z-index: 100;

  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-height: 900px) {
    padding-top: 24px;
    align-items: flex-start;
  }

  @media screen and (max-width: 1000px) {
    padding-top: unset;
    height: fit-content;

    position: fixed;
    top: unset;
    left: 0;
    right: 0;
    bottom: var(--bottom);
    pointer-events: none;

    &,
    & > div {
      height: var(--device-height);
    }

    & > div {
      pointer-events: auto;
    }
  }

  @media screen and (max-width: 600px) {
    &,
    & > div {
      height: var(--device-height);
    }
  }
`;
