import styled from '@emotion/styled';
import { Tree } from '@geist-ui/core';
import { useRouter } from 'next/router';

import blogPosts from '../lib/constants/posts/blog';
import tweets from '../lib/constants/posts/tweets';

export type PostListProps = {
  // TODO: Support expanding only current folder
  initialExpand?: boolean;
};

export const PostList: React.FC<PostListProps> = ({ initialExpand }) => {
  const router = useRouter();

  return (
    <Wrapper>
      <Container>
        <StyledTree initialExpand={initialExpand}>
          <Tree.File
            extra="Home"
            name="README.md"
            onClick={() => router.push('/')}
          />
          <Tree.Folder name="Tweets">
            {tweets.map((post) => {
              const slug = post.slug === '/' ? '' : post.slug || '';
              return (
                <Tree.File
                  extra={post.date}
                  key={`tweets/${slug}`}
                  name={!slug ? 'README.md' : post.title}
                  onClick={() => router.push(`/tweets/${slug}`)}
                />
              );
            })}
          </Tree.Folder>
          {blogPosts.map((post) => (
            <Tree.File
              key={post.slug}
              name={post.title}
              onClick={() => router.push(`/${post.slug}`)}
            />
          ))}
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
