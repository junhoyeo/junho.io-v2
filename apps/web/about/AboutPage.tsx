import styled from '@emotion/styled';
import { type NextPage } from 'next';

import '@junhoyeo/iphone/dist/style.css';

import {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
  type DynamicIslandSize,
} from '@junhoyeo/iphone';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Footer } from '@/components/Footer';
import { MDXRenderer } from '@/components/mdx-renderer';
import { PhoneInstance } from '@/components/phone-instance';
import { useWindowSize } from '@/hooks/use-window-size';
import { type PostDocument } from '@/posts/lib/types';
import { Analytics } from '@/utils/analytics';

import { Header } from './components/Header';
import { Head } from './components/head';

const AboutPage: NextPage<PostDocument> = (props) => {
  const { screenWidth = 1980 } = useWindowSize();

  const [transformScale, setTransformScale] = useState<number>(0);
  const [dynamicIslandSize, setDynamicIslandSize] =
    useState<DynamicIslandSize>('default');

  useEffect(() => {
    Analytics.logEvent('view_landing', undefined);
  }, []);

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

  const [isCollapsed, setCollapsed] = useState<boolean>(false);
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const element = e.target as HTMLElement;

      const deviceClicked = element.closest('.device');
      const dynamicIslandClicked =
        element.closest('.dynamic-island-container') &&
        element.closest('button');

      if (!isCollapsed && dynamicIslandClicked) {
        return;
      }
      if (deviceClicked) {
        setCollapsed((prev) => !prev);
      } else {
        setCollapsed(true);
      }
    };
    window.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('click', onClick);
    };
  }, [isCollapsed]);

  const width = useMemo(
    () => (screenWidth > 1000 ? DEVICE_WIDTH * 0.85 : undefined),
    [screenWidth],
  );

  const toggleCall = useCallback(
    () =>
      setDynamicIslandSize((prev) =>
        prev === 'default' ? 'large' : 'default',
      ),
    [],
  );

  return (
    <Wrapper>
      <Head />

      <Container>
        <Header />

        <main>
          <MDXRenderer {...props} />
        </main>

        <Footer />
      </Container>
      <PhoneContainer
        style={{ width }}
        ref={phoneContainerRef}
        className={isCollapsed ? 'collapsed' : ''}
      >
        <PhoneInstance
          transformScale={transformScale}
          dynamicIslandProps={{
            default: 'default',
            state: dynamicIslandSize,
            setState: setDynamicIslandSize,
            onClick: toggleCall,
          }}
          onClickDockedApp={toggleCall}
        />
      </PhoneContainer>
    </Wrapper>
  );
};

export default AboutPage;

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
    padding-bottom: 24px;
  }
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

  .device {
    transform-origin: center;
    transition: transform 0.68s ease-in-out;
  }

  @media screen and (max-height: 900px) {
    padding-top: 24px;
    align-items: flex-start;
  }

  @media screen and (max-width: 1000px) {
    padding-top: unset;
    width: 100%;
    height: fit-content;

    position: fixed;
    top: unset;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;

    will-change: transform;
    transition: transform 0.12s ease;
    transform: translate3d(0, calc(var(--bottom) * -1), 0);

    &,
    & > div {
      height: var(--device-height);
    }

    & > div {
      pointer-events: auto;
    }

    .device {
      cursor: pointer;
    }

    &.collapsed {
      transform: translate3d(0, calc(var(--bottom) * -2), 0);
    }

    .device-frame {
      &::before {
        content: '';
        position: absolute;
        top: -7px;
        right: -7px;
        bottom: -7px;
        left: -7px;

        transition: border 0.12s ease;
        border: 8px solid rgba(255, 255, 255, 0);
        border-radius: 74px;
      }
    }

    &:hover {
      .device-frame {
        &::before {
          border: 8px solid rgba(255, 255, 255, 0.25);
        }
      }
    }
  }

  @media screen and (max-width: 600px) {
    &,
    & > div {
      height: var(--device-height);
    }
  }
`;
