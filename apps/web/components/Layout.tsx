import styled from '@emotion/styled';
import { Page, useTheme } from '@geist-ui/core';
import React from 'react';

import { fixedWidth } from '../utils/css';
import { CommentDrawer } from './CommentDrawer';
import { NavigationBar } from './NavigationBar';
import { PostList, type PostListProps } from './PostList';
import { PostMenuDrawer } from './PostMenuDrawer';

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
        <PostMenuDrawer />
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
  ${fixedWidth(380)}

  @media screen and (max-width: 1440px) {
    ${fixedWidth(300)}
  }

  @media screen and (max-width: 982px) {
    display: none;
  }
`;
const RightSidebar = styled(Sidebar)`
  ${fixedWidth(300)}

  @media screen and (max-width: 1440px) {
    ${fixedWidth(200)}
  }

  @media screen and (max-width: 1360px) {
    ${fixedWidth(180)}
  }

  @media screen and (max-width: 1200px) {
    display: none;
  }
`;
