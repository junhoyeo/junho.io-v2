import styled from '@emotion/styled';
import '@junhoyeo/iphone/dist/style.css';
import {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
  type DynamicIslandSize,
} from '@junhoyeo/iphone';
import { type NextPage } from 'next';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Footer } from '@/components/Footer';
import { MDXRenderer } from '@/components/mdx-renderer';
import { PhoneInstance } from '@/components/phone-instance';
import { useWindowSize } from '@/hooks/use-window-size';
import { type PostDocument } from '@/posts/lib/types';
import { colors } from '@/styles/colors';
import { Analytics } from '@/utils/analytics';
import { Head } from './components/head';
import { Header } from './components/Header';

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

        <Main>
          <MDXRenderer {...props} />
        </Main>

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
  flex: 1 1 0%;

  display: flex;
  flex-direction: column;

  @media screen and (max-width: 1000px) {
    margin-right: 0;
    width: 100%;
  }
`;
const Main = styled.main`
  padding-bottom: 24px;

  font-size: 17.6px;
  font-weight: 300;
  line-height: 1.65;

  a {
    display: inline-block;
    cursor: pointer;
    font-size: inherit;
    -webkit-touch-callout: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-box-align: center;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    color: #3291ff;
    -webkit-text-decoration: none;
    text-decoration: none;
  }

  code {
    color: #79ffe1;
    font-family:
      Menlo,
      Monaco,
      Lucida Console,
      Liberation Mono,
      DejaVu Sans Mono,
      Bitstream Vera Sans Mono,
      Courier New,
      monospace;
    font-size: 0.9em;
    white-space: pre-wrap;
  }

  code:before,
  code:after {
    content: '\`';
  }

  blockquote {
    border-left: 4px solid ${colors.accents_2};
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    background: ${colors.accents_1};
    padding: 4px;
    padding-left: 32px;
    color: ${colors.accents_8};
  }

  h3 {
    font-size: 1.5rem;
    -webkit-letter-spacing: -0.02em;
    -moz-letter-spacing: -0.02em;
    -ms-letter-spacing: -0.02em;
    letter-spacing: -0.02em;
    font-weight: 600;
  }

  h3 {
    font-size: 1.5rem;
    -webkit-letter-spacing: -0.02em;
    -moz-letter-spacing: -0.02em;
    -ms-letter-spacing: -0.02em;
    letter-spacing: -0.02em;
    font-weight: 600;
  }

  p {
    margin: 1em 0;
  }

  ul {
    margin-top: 16px;
    margin-bottom: 16px;
    list-style: disc;
    padding-left: 32px;
  }

  ol {
    margin-top: 16px;
    margin-bottom: 16px;
    list-style: decimal;
    padding-left: 32px;
  }

  li {
    margin-bottom: 0.625em;
  }

  img {
    margin: 0 auto;
    display: flex;
    border-radius: 8px;
    width: 100%;
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
