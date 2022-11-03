import styled from '@emotion/styled';
import { Button, Drawer } from '@geist-ui/core';
import { X as XIcon } from '@geist-ui/icons';
import { useAtom } from 'jotai';
import React from 'react';

import { isPostDrawerOpenAtom } from '../state/posts';
import { PostList } from './PostList';

export const PostMenuDrawer: React.FC = () => {
  const [isCommentDrawerOpen, setCommentDrawerOpen] =
    useAtom(isPostDrawerOpenAtom);

  return (
    <StyledDrawer
      onClose={() => setCommentDrawerOpen(false)}
      placement="left"
      visible={isCommentDrawerOpen}
    >
      <StyledDrawerContent>
        <Header>
          <div />

          <Button
            auto
            iconRight={<XIcon />}
            onClick={() => setCommentDrawerOpen(false)}
            px={0.6}
          />
        </Header>

        <PostListContainer>
          <PostList initialExpand />
        </PostListContainer>
      </StyledDrawerContent>
    </StyledDrawer>
  );
};

const StyledDrawer = styled(Drawer)`
  &&& {
    padding: 16px 32px;

    @media screen and (max-width: 576px) {
      padding: 12px 20px;
    }
  }
`;
const StyledDrawerContent = styled(Drawer.Content)`
  &&& {
    padding-top: 0;
    width: 380px;

    @media screen and (max-width: 576px) {
      width: 100vw;
    }
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
`;
const PostListContainer = styled.div`
  margin-left: -16px;

  @media screen and (max-width: 576px) {
    margin-left: -12px;
  }
`;
