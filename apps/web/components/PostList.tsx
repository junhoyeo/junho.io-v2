import styled from '@emotion/styled';
import { Tree } from '@geist-ui/core';
import Link from 'next/link';

import posts from '../lib/constants/posts.json';

export const PostList: React.FC = () => {
  return (
    <Container>
      <Tree>
        <Link href="/">
          <Tree.File extra="Home" name="README.md" />
        </Link>
        {posts.map((post) => (
          <Link href={post.slug}>
            <Tree.File name={post.title} />
          </Link>
        ))}
        <Tree.Folder name="Tweets">
          <Tree.File name="README.md" />
        </Tree.Folder>
      </Tree>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 64px;
`;
