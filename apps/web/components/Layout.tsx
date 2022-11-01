import { css, type SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';
import { Breadcrumbs, Drawer, Page, useTheme } from '@geist-ui/core';
import { useState } from 'react';

export type LayoutProps = {
  header?: React.ReactNode;
  leftContent?: React.ReactNode;
  children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({
  header,
  leftContent,
  children,
}) => {
  const { palette } = useTheme();
  const [isCommentDrawerOpen, setCommentDrawerOpen] = useState<boolean>(false);

  return (
    <Wrapper>
      {!!leftContent && (
        <Sidebar
          style={{ borderRight: `1px solid ${palette.accents_2}` }}
          width={200}
        >
          {leftContent}
        </Sidebar>
      )}
      <Container>
        {header}
        <Page style={{ minHeight: 'unset', width: 'unset' }}>
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            {children}
          </div>
        </Page>
      </Container>

      <Drawer
        onClose={(): void => setCommentDrawerOpen(false)}
        placement="right"
        visible={isCommentDrawerOpen}
      >
        <Drawer.Title>Drawer</Drawer.Title>
        <Drawer.Subtitle>This is a drawer</Drawer.Subtitle>
        <Drawer.Content>
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
