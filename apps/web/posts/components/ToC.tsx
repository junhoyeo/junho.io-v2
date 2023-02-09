import styled from '@emotion/styled';
import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';

import { type Heading } from '../lib/rehype-extract-headings';

const observerOption = {
  threshold: 0.5,
  rootMargin: '-80px 0px 0px 0px',
};

export const getIntersectionObserver = (
  setState: Dispatch<SetStateAction<string>>,
) => {
  let direction = '';
  let previousPositionY = 0;

  const checkScrollDirection = (prevY: number) => {
    if (window.scrollY === 0 && prevY === 0) return;
    else if (window.scrollY > prevY) direction = 'down';
    else direction = 'up';
    previousPositionY = window.scrollY;
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      checkScrollDirection(previousPositionY);

      if (
        (direction === 'down' && !entry.isIntersecting) ||
        (direction === 'up' && entry.isIntersecting)
      ) {
        console.log('set', entry.target.id);
        setState(entry.target.id);
      }
    });
  }, observerOption);

  return observer;
};

type ToCProps = {
  headings: Heading[];
};
export const ToC: React.FC<ToCProps> = ({ headings }) => {
  const [currentId, setCurrentId] = useState<string>(headings[0]?.id || '');
  const scrollToIdRef = useRef<string | null>(null);
  useEffect(() => {
    const observer = getIntersectionObserver(setCurrentId);
    const headingElements = Array.from(document.querySelectorAll('h2, h3'));
    headingElements.forEach((header) => {
      observer.observe(header);
    });
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timer;
    window.addEventListener(
      'scroll',
      () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          setTimeout(() => {
            if (
              !!scrollToIdRef.current &&
              currentId !== scrollToIdRef.current
            ) {
              setCurrentId(scrollToIdRef.current);
            }
          });
        }, 200);
      },
      { passive: true },
    );
  }, [currentId]);

  return (
    <Container id="toc">
      {headings.map((heading) => (
        <a
          key={heading.id}
          href={`#${heading.id}`}
          className={currentId === heading.id ? 'current' : undefined}
          style={{ marginLeft: 16 * (heading.rank - 2) }}
          onClick={(e) => {
            e.preventDefault();

            const target = document.getElementById(heading.id);
            if (target) {
              scrollToIdRef.current = heading.id;
              window.scrollTo({
                top: target.offsetTop - 82,
                behavior: 'smooth',
              });
            }
          }}
        >
          {heading.title}
        </a>
      ))}
    </Container>
  );
};

const Container = styled.div`
  padding: 100px 0 64px;
  display: flex;
  flex-direction: column;
  gap: 4px;

  position: sticky;
  top: 0;
  right: 0;
  height: 100vh;
  z-index: 100;
  overflow-y: scroll;

  width: 240px;
  min-width: 240px;

  a {
    color: rgb(102, 102, 102);
    transition: all 0.1s ease-in-out;
    transform-origin: center left;
    font-weight: 500;

    &:hover {
      color: rgb(187, 187, 187);
    }

    &.current {
      color: white;
      font-weight: bold;
      transform: scale(105%);
    }
  }
`;
