import styled from '@emotion/styled';
import { /* Button, */ Text, useTheme } from '@geist-ui/core';
import { Anchor /* X as Cross, Menu */ } from '@geist-ui/icons';
// import { useAtom } from 'jotai';
import Link from 'next/link';
import { useRouter } from 'next/router';

// import { isPostDrawerOpenAtom } from '@/state/posts';

export const NavigationBar: React.FC = () => {
  const router = useRouter();
  const { palette } = useTheme();
  // const [isPostDrawerOpen, setPostDrawerOpen] = useAtom(isPostDrawerOpenAtom);

  return (
    <Wrapper>
      <Container style={{ border: `1px solid ${palette.accents_2}` }}>
        <Link href="/">
          <Brand style={{ color: palette.accents_8 }}>
            <Anchor size={28} />
            <Text b span style={{ fontSize: 24 }}>
              junhø.io
            </Text>
          </Brand>
        </Link>

        <BlogLink
          href="/blog"
          style={{
            color: ['/blog', '/w/'].some((r) => router.asPath.includes(r))
              ? palette.accents_8
              : palette.accents_4,
          }}
        >
          Blog
        </BlogLink>

        {/*
        <PostDrawerButton
          auto
          iconRight={isPostDrawerOpen ? <Cross /> : <Menu />}
          onClick={() => setPostDrawerOpen((prev) => !prev)}
          px={0.6}
        /> */}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 0 16px;
  width: 100%;

  position: fixed;
  top: 16px;
  left: 0;
  right: 0;
  z-index: 100;

  display: flex;
  justify-content: center;
`;
const Container = styled.div`
  padding: 12px 20px;
  width: 100%;
  max-width: 740px;

  display: flex;
  align-items: center;
  gap: 16px;

  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.32);
  backdrop-filter: saturate(140%) blur(12px);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  user-select: none;
`;
const BlogLink = styled(Link)`
  font-weight: 500;
`;

// const PostDrawerButton = styled(Button)`
//   &&& {
//     display: none;

//     @media screen and (max-width: 982px) {
//       display: inline-block;
//     }
//   }
// `;
