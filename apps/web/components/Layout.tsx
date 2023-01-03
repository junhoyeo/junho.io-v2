import styled from '@emotion/styled';
import React from 'react';

import { Footer } from './Footer';

export type LayoutProps = {
  containerRef?: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ containerRef, children }) => {
  return (
    <Wrapper>
      <Container className="page-container" ref={containerRef}>
        {children}
      </Container>

      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 0 16px;
  height: 100%;
  min-height: 100vh;

  display: flex;
  flex-direction: column;

  &&& section {
    min-width: 0;
  }

  @media screen and (max-width: 982px) {
    &&& section {
      width: 100%;
    }
  }
`;
const Container = styled.div`
  margin: 0 auto;
  padding-top: 120px;
  width: 100%;
  max-width: 800px;

  position: relative;
  display: flex;
  flex-direction: column;
`;
