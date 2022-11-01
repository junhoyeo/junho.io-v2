import styled from '@emotion/styled';
import { Button } from '@geist-ui/core';
import { MessageCircle } from '@geist-ui/icons';
import { useSetAtom } from 'jotai';

import { isCommentDrawerOpenAtom } from '../state/comments';

export const NavigationBar: React.FC = () => {
  const setCommentDrawerOpen = useSetAtom(isCommentDrawerOpenAtom);

  return (
    <Wrapper className="navigation">
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
  position: relative;
  width: 100%;
`;
const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;

  width: 100%;
  padding: 16px;

  display: flex;
  align-items: center;
`;
