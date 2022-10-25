import styled from '@emotion/styled';
import { Breadcrumbs, Card, Page, Text, User, useTheme } from '@geist-ui/core';

export interface LayoutProps {
  header: React.ReactNode;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ header, children }) => {
  const { palette } = useTheme();
  return (
    <Wrapper>
      <Sidebar style={{ borderRight: `1px solid ${palette.accents_2}` }} />
      <Container>
        {header}
        <Page style={{ minHeight: 'unset' }}>
          <div>{children}</div>
        </Page>
      </Container>
      <Sidebar style={{ borderLeft: `1px solid ${palette.accents_2}` }}>
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
          <Card shadow>
            <User name="Junho Yeo" src="https://github.com/junhoyeo.png">
              8 minutes ago
            </User>
            <Text font="14px" p>
              Wow
            </Text>
          </Card>
          <Card>
            <User name="Junho Yeo" src="https://github.com/junhoyeo.png">
              8 minutes ago
            </User>
            <Text font="14px" p>
              Wow
            </Text>
          </Card>
        </div>
      </Sidebar>
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
