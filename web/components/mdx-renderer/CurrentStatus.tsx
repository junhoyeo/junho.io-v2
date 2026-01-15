import styled from '@emotion/styled';
import { domAnimation, LazyMotion, m, useAnimationFrame } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useId, useRef, useState } from 'react';
import { colors } from '@/styles/colors';

function smoothStep(a: number, b: number, t: number): number {
  t = Math.max(0, Math.min(1, (t - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

function length(x: number, y: number): number {
  return Math.sqrt(x * x + y * y);
}

function roundedRectSDF(
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
): number {
  const qx = Math.abs(x) - width + radius;
  const qy = Math.abs(y) - height + radius;
  return (
    Math.min(Math.max(qx, qy), 0) +
    length(Math.max(qx, 0), Math.max(qy, 0)) -
    radius
  );
}

interface LiquidGlassProps {
  width: number;
  height: number;
  children: React.ReactNode;
  className?: string;
}

const LiquidGlass: React.FC<LiquidGlassProps> = ({
  width,
  height,
  children,
  className,
}) => {
  const id = useId().replace(/:/g, '');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dataUrl, setDataUrl] = useState<string>('');
  const [scale, setScale] = useState<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const canvasDPI = 2;
    canvas.width = width * canvasDPI;
    canvas.height = height * canvasDPI;

    const w = canvas.width;
    const h = canvas.height;
    const data = new Uint8ClampedArray(w * h * 4);

    let maxScale = 0;
    const rawValues: number[] = [];

    const fragment = (uvX: number, uvY: number) => {
      const ix = uvX - 0.5;
      const iy = uvY - 0.5;
      const distanceToEdge = roundedRectSDF(ix, iy, 0.4, 0.35, 0.3);
      const displacement = smoothStep(0.5, 0, distanceToEdge - 0.08);
      const scaled = smoothStep(0, 1, displacement);
      return { x: ix * scaled + 0.5, y: iy * scaled + 0.5 };
    };

    for (let i = 0; i < data.length; i += 4) {
      const x = (i / 4) % w;
      const y = Math.floor(i / 4 / w);
      const pos = fragment(x / w, y / h);
      const dx = pos.x * w - x;
      const dy = pos.y * h - y;
      maxScale = Math.max(maxScale, Math.abs(dx), Math.abs(dy));
      rawValues.push(dx, dy);
    }

    maxScale *= 0.5;

    let index = 0;
    for (let i = 0; i < data.length; i += 4) {
      const r = (rawValues[index++] ?? 0) / maxScale + 0.5;
      const g = (rawValues[index++] ?? 0) / maxScale + 0.5;
      data[i] = r * 255;
      data[i + 1] = g * 255;
      data[i + 2] = 0;
      data[i + 3] = 255;
    }

    ctx.putImageData(new ImageData(data, w, h), 0, 0);
    setDataUrl(canvas.toDataURL());
    setScale(maxScale / canvasDPI);
  }, [width, height]);

  const filterId = `liquid-glass-filter-${id}`;

  return (
    <>
      <svg
        style={{
          position: 'absolute',
          width: 0,
          height: 0,
          pointerEvents: 'none',
        }}
      >
        <defs>
          <filter
            id={filterId}
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
            x="0"
            y="0"
            width={width}
            height={height}
          >
            {dataUrl && (
              <>
                <feImage
                  href={dataUrl}
                  width={width}
                  height={height}
                  result="displacementMap"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="displacementMap"
                  xChannelSelector="R"
                  yChannelSelector="G"
                  scale={scale}
                />
              </>
            )}
          </filter>
        </defs>
      </svg>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <LiquidGlassContainer
        className={className}
        style={{
          backdropFilter: `url(#${filterId}) blur(1px) contrast(1.15) brightness(1.05) saturate(1.2)`,
          WebkitBackdropFilter: `url(#${filterId}) blur(1px) contrast(1.15) brightness(1.05) saturate(1.2)`,
        }}
      >
        {children}
      </LiquidGlassContainer>
    </>
  );
};

const LiquidGlassContainer = styled.div`
  position: relative;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.05) 50%,
    rgba(255, 255, 255, 0.08) 100%
  );
  box-shadow:
    inset 0 1px 1px rgba(255, 255, 255, 0.2),
    inset 0 -1px 1px rgba(0, 0, 0, 0.1),
    0 2px 8px rgba(0, 0, 0, 0.15);
`;

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
              <LiquidGlass width={420} height={40}>
                <WindowTitleBarContent>
                  <WindowButtons>
                    <WindowButton color="#ff5f57" />
                    <WindowButton color="#febc2e" />
                    <WindowButton color="#28c840" />
                  </WindowButtons>
                  <WindowTitle>{item.title}</WindowTitle>
                  <WindowButtonsSpacer />
                </WindowTitleBarContent>
              </LiquidGlass>
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

const WindowTitleBarContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  width: 100%;
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
