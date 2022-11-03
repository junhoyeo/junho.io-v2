import styled from '@emotion/styled';
import { Page, useTheme } from '@geist-ui/core';
import React from 'react';

import { CommentDrawer } from './CommentDrawer';
import { NavigationBar } from './NavigationBar';
import { PostList, type PostListProps } from './PostList';

export type LayoutProps = {
  containerRef?: React.RefObject<HTMLDivElement>;
  header?: React.ReactNode;
  leftContent?: React.ReactNode;
  defaultPostListProps?: PostListProps;
  rightContent?: React.ReactNode;
  children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({
  containerRef,
  header,
  leftContent,
  rightContent,
  children,
  defaultPostListProps,
}) => {
  const { palette } = useTheme();

  return (
    <>
      <NavigationBar />
      <Wrapper>
        <LeftSidebar style={{ borderRight: `1px solid ${palette.accents_2}` }}>
          {!leftContent && <PostList {...defaultPostListProps} />}
        </LeftSidebar>

        <Page>
          <Page.Content style={{ paddingTop: !header ? 64 : 0 }}>
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

        <RightSidebar>{rightContent}</RightSidebar>

        <CommentDrawer />
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  min-height: 100vh;

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
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Sidebar = styled.div`
  flex: 1;
`;

const LeftSidebar = styled(Sidebar)`
  width: 280px;
  min-width: 280px;
  max-width: 280px;
  overflow-x: hidden;

  @media screen and (max-width: 1440px) {
    width: 260px;
    min-width: 260px;
    max-width: 260px;
  }

  @media screen and (max-width: 1360px) {
    width: 240px;
    min-width: 240px;
    max-width: 240px;
  }

  @media screen and (max-width: 1200px) {
    width: 200px;
    min-width: 200px;
    max-width: 200px;
  }

  @media screen and (max-width: 982px) {
    display: none;
  }
`;
const RightSidebar = styled(Sidebar)`
  width: 200px;
  min-width: 200px;
  max-width: 200px;

  @media screen and (max-width: 1360px) {
    width: 180px;
    min-width: 180px;
    max-width: 180px;
  }

  @media screen and (max-width: 1200px) {
    width: 140px;
    min-width: 140px;
    max-width: 140px;
  }

  @media screen and (max-width: 982px) {
    display: none;
  }
`;
