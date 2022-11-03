import styled from '@emotion/styled';
import { Button, Text, useTheme } from '@geist-ui/core';
import { Anchor, Menu } from '@geist-ui/icons';
import { useSetAtom } from 'jotai';
import Link from 'next/link';

import { isPostDrawerOpenAtom } from '../state/posts';

export const NavigationBar: React.FC = () => {
  const { palette } = useTheme();
  const setPostDrawerOpen = useSetAtom(isPostDrawerOpenAtom);

  return (
    <Wrapper style={{ borderBottom: `1px solid ${palette.accents_1}` }}>
      <Container>
        <Link href="/">
          <Brand style={{ color: palette.accents_8 }}>
            <Anchor size={28} />
            <Text b span style={{ fontSize: 24 }}>
              Paracøsm
            </Text>
          </Brand>
        </Link>

        <PostDrawerButton
          auto
          iconRight={<Menu />}
          onClick={() => setPostDrawerOpen(true)}
          px={0.6}
        />
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  z-index: 20;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: saturate(140%) blur(16px);
  display: flex;
`;
const Container = styled.div`
  width: 100%;
  padding: 12px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 576px) {
    padding: 12px 20px;
  }
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  user-select: none;
`;

const PostDrawerButton = styled(Button)`
  &&& {
    display: none;

    @media screen and (max-width: 982px) {
      display: inline-block;
    }
  }
`;
