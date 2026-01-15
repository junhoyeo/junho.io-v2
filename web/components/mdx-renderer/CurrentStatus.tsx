import styled from '@emotion/styled';
import { domAnimation, LazyMotion, m, useAnimationFrame } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { colors } from '@/styles/colors';

const CURRENT_ITEMS = [
  {
    id: 'stroke',
    src: '/assets/about/strokecompany.jpg',
    alt: 'Stroke Company',
    title: 'Stroke',
    href: 'https://strokecompany.io',
  },
  {
    id: 'sisyphus-labs',
    src: '/assets/about/sisyphus-labs.png',
    alt: 'Sisyphus Labs',
    title: 'Sisyphus Labs',
    href: 'https://sisyphuslabs.ai/',
  },
  {
    id: 'inevitable',
    src: '/assets/about/inevitable-1.jpg',
    alt: 'Inevitable',
    title: 'Inevitable',
    href: 'https://inevitable.team/',
  },
  {
    id: 'mitosis',
    src: '/assets/about/inevitable-2.png',
    alt: 'Mitosis',
    title: 'Mitosis',
    href: 'https://mitosis.org',
  },
];

export const CurrentStatus: React.FC = () => {
  const [offset, setOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useAnimationFrame((time) => {
    setOffset((time / 50) % 400);
  });

  return (
    <LazyMotion features={domAnimation}>
      <Container ref={containerRef}>
        {CURRENT_ITEMS.map((item, index) => {
          const isEven = index % 2 === 0;
          const floatY = Math.sin((offset + index * 100) * 0.018) * 20;
          const floatX = Math.cos((offset + index * 70) * 0.015) * 12;
          const floatRotate = Math.sin((offset + index * 90) * 0.012) * 3;

          return (
            <WindowCard
              key={item.id}
              id={item.id}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: -80, scale: 0.85, rotate: -3 }}
              animate={{
                opacity: 1,
                y: floatY,
                x: floatX,
                scale: 1,
                rotate: floatRotate,
              }}
              whileHover={{
                scale: 1.05,
                y: floatY - 12,
                transition: {
                  scale: { type: 'spring', stiffness: 300, damping: 20 },
                  y: { type: 'spring', stiffness: 300, damping: 20 },
                },
              }}
              transition={{
                opacity: { duration: 0.8, delay: index * 0.2 },
                y: { duration: 0.3, ease: 'easeOut' },
                x: { duration: 0.3, ease: 'easeOut' },
                rotate: { duration: 0.3, ease: 'easeOut' },
                scale: { duration: 0.8, delay: index * 0.2, type: 'spring' },
              }}
              style={{
                alignSelf: isEven ? 'flex-end' : 'flex-start',
                marginTop: index === 0 ? 0 : -40,
              }}
            >
              <WindowTitleBar>
                <WindowButtons>
                  <WindowButton color="#ff5f57" />
                  <WindowButton color="#febc2e" />
                  <WindowButton color="#28c840" />
                </WindowButtons>
                <WindowTitle>{item.title}</WindowTitle>
                <WindowButtonsSpacer />
              </WindowTitleBar>
              <WindowContent>
                <WindowImage
                  src={item.src}
                  alt={item.alt}
                  width={600}
                  height={400}
                  quality={90}
                />
              </WindowContent>
            </WindowCard>
          );
        })}
      </Container>
    </LazyMotion>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin: 32px 0;
  padding: 20px 0;
`;

const WindowCard = styled(m.a)`
  display: block;
  text-decoration: none;
  cursor: pointer;
  width: 75%;
  max-width: 420px;
  border-radius: 12px;
  overflow: hidden;
  background: linear-gradient(
    145deg,
    rgba(35, 35, 45, 0.95),
    rgba(20, 20, 28, 0.98)
  );
  border: 1px solid ${colors.accents_2};
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.5),
    0 2px 8px rgba(0, 0, 0, 0.3);

  &:hover {
    border-color: rgba(255, 255, 255, 0.18);
    box-shadow:
      0 20px 50px rgba(0, 0, 0, 0.6),
      0 8px 20px rgba(0, 0, 0, 0.4);
  }

  transition:
    border-color 0.4s ease,
    box-shadow 0.4s ease;

  @media screen and (max-width: 600px) {
    width: 85%;
    max-width: none;
  }
`;

const WindowTitleBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  background: linear-gradient(
    180deg,
    rgba(55, 55, 65, 0.9),
    rgba(40, 40, 50, 0.95)
  );
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
`;

const WindowButtons = styled.div`
  display: flex;
  gap: 7px;
`;

const WindowButton = styled.div<{ color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  box-shadow: inset 0 -1px 1px rgba(0, 0, 0, 0.2);
`;

const WindowButtonsSpacer = styled.div`
  width: 54px;
`;

const WindowTitle = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
  flex: 1;
`;

const WindowContent = styled.div`
  position: relative;
  overflow: hidden;
`;

const WindowImage = styled(Image)`
  width: 100%;
  height: auto;
  display: block;
  filter: saturate(1.05);
`;
