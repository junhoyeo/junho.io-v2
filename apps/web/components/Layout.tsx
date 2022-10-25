import styled from '@emotion/styled';
import { Page, useTheme } from '@geist-ui/core';

export interface LayoutProps {
  header?: React.ReactNode;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  children: React.ReactNode;
}

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
        <Sidebar style={{ borderRight: `1px solid ${palette.accents_2}` }}>
          {leftContent}
        </Sidebar>
      )}
      <Container>
        {header}
        <Page style={{ minHeight: 'unset' }}>
          <div>{children}</div>
        </Page>
      </Container>
      {!!rightContent && (
        <Sidebar style={{ borderLeft: `1px solid ${palette.accents_2}` }}>
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
const Sidebar = styled.div`
  padding: 24px 28px;
  width: 380px;
  min-width: 380px;
  display: flex;
  flex-direction: column;
`;
