import { css, type SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';
import { Page, useTheme } from '@geist-ui/core';

export type LayoutProps = {
  header?: React.ReactNode;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({
  header,
  leftContent,
  rightContent,
  children,
}) => {
  const { palette } = useTheme();
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
      {!!rightContent && (
        <Sidebar
          style={{ borderLeft: `1px solid ${palette.accents_2}` }}
          width={380}
        >
          {rightContent}
        </Sidebar>
      )}
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
