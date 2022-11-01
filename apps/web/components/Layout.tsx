import { css, type SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';
import { Page, useTheme } from '@geist-ui/core';
import React from 'react';

import { CommentDrawer } from './CommentDrawer';
import { NavigationBar } from './NavigationBar';

export type LayoutProps = {
  containerRef?: React.RefObject<HTMLDivElement>;
  header?: React.ReactNode;
  leftContent?: React.ReactNode;
  children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({
  containerRef,
  header,
  leftContent,
  children,
}) => {
  const { palette } = useTheme();

  return (
    <>
      <NavigationBar />
      <Wrapper>
        {!!leftContent && (
          <Sidebar
            style={{ borderRight: `1px solid ${palette.accents_2}` }}
            width={280}
          >
            {leftContent}
          </Sidebar>
        )}
        <Page>
          <Page.Content
            style={{
              paddingTop: !header ? 64 : 0,
              minHeight: 'unset',
              width: 'unset',
            }}
          >
            <Container className="page-container" ref={containerRef}>
              {header}

              <div
                style={{ width: '100%', height: '100%', position: 'relative' }}
              >
                {children}
              </div>
            </Container>
          </Page.Content>
        </Page>

        <Sidebar width={200} />

        <CommentDrawer />
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  min-height: 100vh;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

type SidebarProps = {
  width: number;
};
const Sidebar = styled.div<SidebarProps>`
  padding: 24px 28px;
  display: flex;
  flex-direction: column;

  ${({ width }): 0 | SerializedStyles =>
    width &&
    css`
      width: ${width}px;
      min-width: ${width}px;
    `};
`;
