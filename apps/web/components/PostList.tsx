import styled from '@emotion/styled';
import { Tree } from '@geist-ui/core';
import { useSetAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

import blogPosts from '../lib/constants/posts/blog';
import memex from '../lib/constants/posts/memex';
import tweets from '../lib/constants/posts/tweets';
import { isPostDrawerOpenAtom } from '../state/posts';

export type PostListProps = {
  // TODO: Support expanding only current folder
  initialExpand?: boolean;
};

export const PostList: React.FC<PostListProps> = ({ initialExpand }) => {
  const router = useRouter();
  const setPostDrawerOpen = useSetAtom(isPostDrawerOpenAtom);

  const pushRoute = useCallback(
    (route: string) => {
      router.push(route);
      setPostDrawerOpen(false);
    },
    [router, setPostDrawerOpen],
  );

  return (
    <Wrapper>
      <Container>
        <StyledTree initialExpand={initialExpand}>
          <Tree.File
            extra="Home"
            name="README.md"
            onClick={() => pushRoute('/')}
          />
          <Tree.Folder name="Tweets">
            {tweets.map((post) => {
              const slug = post.slug === '/' ? '' : post.slug || '';
              return (
                <Tree.File
                  extra={post.date}
                  key={`t/${slug}`}
                  name={!slug ? 'README.md' : post.title}
                  onClick={() => pushRoute(`/t/${slug}`)}
                />
              );
            })}
          </Tree.Folder>
          <Tree.Folder name="Blog">
            {blogPosts.map((post) => {
              return (
                <Tree.File
                  key={`s/${post.slug}`}
                  name={post.title}
                  onClick={() => pushRoute(`/w/${post.slug}`)}
                />
              );
            })}
          </Tree.Folder>
          <Tree.Folder name="Memex">
            {memex.map((post) => (
              <Tree.File
                key={`r/${post.slug}`}
                name={post.title}
                onClick={() => pushRoute(`/r/${post.slug}`)}
              />
            ))}
          </Tree.Folder>
        </StyledTree>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.aside`
  width: 100%;
  height: calc(100vh - 64px);

  position: sticky;
  top: 64px;
`;
const Container = styled.div`
  padding: 24px 28px;

  max-width: 100%;
  overflow-x: hidden;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
`;

const StyledTree = styled(Tree)`
  &&& .name {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;
