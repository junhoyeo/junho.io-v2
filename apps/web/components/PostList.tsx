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
    <Container>
      <Tree initialExpand={initialExpand}>
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
      </Tree>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 64px;
`;
