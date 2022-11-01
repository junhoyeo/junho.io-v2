import styled from '@emotion/styled';
import { Button, useTheme } from '@geist-ui/core';
import { MessageCircle } from '@geist-ui/icons';
import { useSetAtom } from 'jotai';

import { isCommentDrawerOpenAtom } from '../state/comments';

export const NavigationBar: React.FC = () => {
  const { palette } = useTheme();
  const setCommentDrawerOpen = useSetAtom(isCommentDrawerOpenAtom);

  return (
    <Wrapper style={{ borderBottom: `1px solid ${palette.accents_1}` }}>
      <Container>
        <Button
          auto
          iconRight={<MessageCircle />}
          onClick={(): void => setCommentDrawerOpen(true)}
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
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: saturate(140%) blur(16px);
`;
const Container = styled.div`
  width: 100%;
  padding: 12px;

  display: flex;
  align-items: center;
`;
