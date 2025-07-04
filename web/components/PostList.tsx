import styled from '@emotion/styled';
import { format, formatDistance } from 'date-fns';
import { useSetAtom } from 'jotai';
import Link from 'next/link';
import { useRouter } from 'next/router';
import blogPosts from '@/posts/generated/blog';
import { isPostDrawerOpenAtom } from '@/state/posts';
import { colors } from '@/styles/colors';
import { capitalize } from '@/utils/casing';

export const PostList: React.FC = () => {
  const router = useRouter();
  const setPostDrawerOpen = useSetAtom(isPostDrawerOpenAtom);

  return (
    <ListContainer>
      {blogPosts.flatMap((post) => {
        if (post.published === false) {
          return null;
        }
        const active = router.asPath === `/w/${post.slug}`;
        const formattedRelativeTime = !post.date
          ? null
          : capitalize(
              formatDistance(new Date(post.date), new Date(), {
                addSuffix: true,
              }),
            );

        const postDate = !post.date
          ? null
          : format(new Date(post.date), 'MMM d, yyyy');

        return (
          <Link
            href={`/w/${post.slug}`}
            key={`/w/${post.slug}`}
            passHref
            onClick={() => setPostDrawerOpen(false)}
          >
            <ItemContainer>
              <HStack>
                {!!post.emoji && (
                  <EmojiContainer $active={active}>
                    <span>{post.emoji}</span>
                  </EmojiContainer>
                )}
                <span>
                  <PostTitle>{post.title}</PostTitle>
                </span>
              </HStack>
              <span>
                <span style={{ color: '#696970', fontWeight: 'bold' }}>
                  {postDate}
                </span>
                <span style={{ marginLeft: 12, color: '#7a7a91' }}>
                  {formattedRelativeTime}
                </span>
              </span>
            </ItemContainer>
          </Link>
        );
      })}
    </ListContainer>
  );
};

const ListContainer = styled.div`
  margin: 0;
  padding: 24px 0;
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ItemContainer = styled.div`
  padding: 8px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: opacity 0.16s ease;

  &:hover {
    opacity: 0.54;
  }
`;
const HStack = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;

  span {
    font-size: 14px;
    font-weight: bold;
    line-height: 160%;
  }
`;
const EmojiContainer = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 32px;
  min-width: 32px;
  height: 32px;
  border-radius: 4px;
  border: 2px solid;
  background-color: ${colors.accents_1};
  border-color: ${(props) => (props.$active ? 'white' : colors.accents_2)};

  span {
    font-size: 20px;
  }
`;
const PostTitle = styled.h4`
  margin: 0;
  color: ${colors.accents_7};

  font-size: 20px;
  font-weight: 600;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
