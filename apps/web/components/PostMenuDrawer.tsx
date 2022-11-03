import styled from '@emotion/styled';
import { Drawer } from '@geist-ui/core';
import { useAtom } from 'jotai';
import React, { useEffect } from 'react';

import { isPostDrawerOpenAtom } from '../state/posts';
import { PostList } from './PostList';

export const PostMenuDrawer: React.FC = () => {
  const [isPostDrawerOpen, setPostDrawerOpen] = useAtom(isPostDrawerOpenAtom);

  useEffect(() => {
    if (!isPostDrawerOpen) {
      return;
    }
    setTimeout(() => {
      const backdrop = document.querySelector(
        '#geist-ui-drawer > div.backdrop',
      ) as HTMLDivElement | undefined;

      if (backdrop) {
        backdrop.style.zIndex = '10';
      }
    });
  }, [isPostDrawerOpen]);

  return (
    <StyledDrawer
      onClose={() => setPostDrawerOpen(false)}
      placement="left"
      visible={isPostDrawerOpen}
    >
      <StyledDrawerContent>
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

const PostListContainer = styled.div`
  &&&& {
    margin-top: 48px;
    margin-left: -16px;

    @media screen and (max-width: 576px) {
      margin-left: -12px;
    }
  }
`;
