import { css, type SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';
import { Breadcrumbs, Drawer, Page, useTheme } from '@geist-ui/core';
import { useAtom, useAtomValue } from 'jotai';
import React from 'react';

import { commentsAtom, isCommentDrawerOpenAtom } from '../state/comments';
import { NavigationBar } from './NavigationBar';
import { UserCommentCard } from './UserCommentCard';

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
  const [isCommentDrawerOpen, setCommentDrawerOpen] = useAtom(
    isCommentDrawerOpenAtom,
  );
  const comments = useAtomValue(commentsAtom);

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
            style={{ paddingTop: 0, minHeight: 'unset', width: 'unset' }}
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

        <Drawer
          onClose={(): void => setCommentDrawerOpen(false)}
          placement="right"
          visible={isCommentDrawerOpen}
        >
          <Drawer.Content style={{ width: 380, paddingTop: 0 }}>
            <Breadcrumbs>
              <Breadcrumbs.Item>Paracosm</Breadcrumbs.Item>
              <Breadcrumbs.Item>Home</Breadcrumbs.Item>
            </Breadcrumbs>

            <div
              style={{
                marginTop: 16,
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              {comments.map((comment) => (
                <UserCommentCard key={comment.uuid} {...comment} />
              ))}
            </div>
          </Drawer.Content>
        </Drawer>
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
