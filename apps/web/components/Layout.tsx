import { Page } from '@geist-ui/core';

export interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Page style={{ minHeight: 'unset' }}>
      <Page.Content>
        <div>{children}</div>
      </Page.Content>
    </Page>
  );
};
