import styled from '@emotion/styled';
import { Breadcrumbs, Button, Drawer } from '@geist-ui/core';
import { X as XIcon } from '@geist-ui/icons';
import { useAtom, useAtomValue } from 'jotai';
import React from 'react';

import { commentsAtom, isCommentDrawerOpenAtom } from '../state/comments';
import { UserCommentCard } from './UserCommentCard';

export const CommentDrawer: React.FC = () => {
  const [isCommentDrawerOpen, setCommentDrawerOpen] = useAtom(
    isCommentDrawerOpenAtom,
  );
  const comments = useAtomValue(commentsAtom);

  return (
    <StyledDrawer
      onClose={(): void => setCommentDrawerOpen(false)}
      placement="right"
      visible={isCommentDrawerOpen}
    >
      <Drawer.Content style={{ width: 380, paddingTop: 0 }}>
        <Header>
          <Breadcrumbs>
            <Breadcrumbs.Item>Paracosm</Breadcrumbs.Item>
            <Breadcrumbs.Item>Home</Breadcrumbs.Item>
          </Breadcrumbs>

          <Button
            auto
            iconRight={<XIcon />}
            onClick={(): void => setCommentDrawerOpen(false)}
            px={0.6}
          />
        </Header>

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
    </StyledDrawer>
  );
};

const StyledDrawer = styled(Drawer)`
  &&& {
    padding: 16px 32px;
  }
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
`;
