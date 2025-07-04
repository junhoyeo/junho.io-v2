import styled from '@emotion/styled';
// import { useAtom } from 'jotai';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { colors } from '@/styles/colors';

// import { isPostDrawerOpenAtom } from '@/state/posts';

export const NavigationBar: React.FC = () => {
  const router = useRouter();
  // const [isPostDrawerOpen, setPostDrawerOpen] = useAtom(isPostDrawerOpenAtom);

  return (
    <Wrapper>
      <WidthProvider>
        <Container>
          <Link href="/" style={{ marginRight: 'auto' }}>
            <Brand>
              <BrandText>junhø.io</BrandText>
            </Brand>
          </Link>

          <NavigationLink
            href="/about"
            style={{
              color:
                router.asPath === '/about'
                  ? colors.accents_8
                  : colors.accents_4,
            }}
          >
            About
          </NavigationLink>
          <NavigationLink
            href="/blog"
            style={{
              color: ['/blog', '/w/'].some((r) => router.asPath.includes(r))
                ? colors.accents_8
                : colors.accents_4,
            }}
          >
            Blog
          </NavigationLink>

          {/*
        <PostDrawerButton
          auto
          iconRight={isPostDrawerOpen ? <Cross /> : <Menu />}
          onClick={() => setPostDrawerOpen((prev) => !prev)}
          px={0.6}
        /> */}
        </Container>
      </WidthProvider>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 0 16px;
  width: 100%;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 300;

  display: flex;
  justify-content: center;
  pointer-events: none;

  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 5%,
    rgba(0, 0, 0, 0) 100%
  );
`;
const WidthProvider = styled.div`
  padding-top: 16px;
  width: 100%;
  max-width: 740px;
`;
const Container = styled.div`
  padding: 12px 20px;
  padding-right: 24px;

  margin-right: auto;
  width: 100%;

  display: flex;
  align-items: center;
  gap: 20px;
  pointer-events: auto;

  border-radius: 8px;
  border: 1px solid ${colors.accents_2};
  background-color: rgba(0, 0, 0, 0.55);
  backdrop-filter: saturate(140%) blur(12px);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  user-select: none;
  color: ${colors.accents_8};
`;

const BrandText = styled.span`
  font-size: 24px;
  font-weight: bold;
`;

const NavigationLink = styled(Link)`
  font-weight: 500;
  transition: all 0.2s ease-in-out;
`;

// const PostDrawerButton = styled(Button)`
//   &&& {
//     display: none;

//     @media screen and (max-width: 982px) {
//       display: inline-block;
//     }
//   }
// `;
