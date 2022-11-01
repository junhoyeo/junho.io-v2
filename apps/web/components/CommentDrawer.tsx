import { Breadcrumbs, Drawer } from '@geist-ui/core';
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
    <Drawer
      onClose={(): void => setCommentDrawerOpen(false)}
      placement="right"
      visible={isCommentDrawerOpen}
    >
      <Drawer.Content style={{ width: 380, paddingTop: 0 }}>
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
          {comments.map((comment) => (
            <UserCommentCard key={comment.uuid} {...comment} />
          ))}
        </div>
      </Drawer.Content>
    </Drawer>
  );
};
