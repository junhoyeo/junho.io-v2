import { Box, Center, Flex, HStack, Heading, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useSetAtom } from 'jotai';
import Link from 'next/link';
import { useRouter } from 'next/router';

import blogPosts from '../posts/generated/blog';
import { isPostDrawerOpenAtom } from '../state/posts';

export type PostListProps = {
  // TODO: Support expanding only current folder
  initialExpand?: boolean;
};

export const PostList: React.FC<PostListProps> = ({
  initialExpand: _initialExpand,
}) => {
  const router = useRouter();
  const setPostDrawerOpen = useSetAtom(isPostDrawerOpenAtom);

  return (
    <Wrapper>
      <Container>
        <Flex>
          <Box>
            <Box>
              {blogPosts.map((post) => {
                const active = router.asPath === `/w/${post.slug}`;

                return (
                  <Link
                    href={`/w/${post.slug}`}
                    key={`/w/${post.slug}`}
                    passHref
                    onClick={() => setPostDrawerOpen(false)}
                  >
                    <HStack
                      _hover={{ color: active ? undefined : 'fg' }}
                      color={active ? 'accent' : 'fg-muted'}
                      fontSize="sm"
                      fontWeight={active ? 'semibold' : 'medium'}
                      spacing="3"
                    >
                      {!!post.emoji && (
                        <Center
                          borderColor={active ? 'purple.300' : 'gray.700'}
                          borderWidth="2px"
                          color={active ? 'white' : 'accent'}
                          h="8"
                          rounded="base"
                          w="8"
                          minW="8"
                        >
                          <Text
                            as="span"
                            fontSize="xl"
                            fontWeight="bold"
                            my="4"
                            textTransform="uppercase"
                            noOfLines={2}
                          >
                            {post.emoji}
                          </Text>
                        </Center>
                      )}
                      <span>
                        <Heading
                          as="h4"
                          fontSize="xl"
                          fontWeight="bold"
                          my="4"
                          textTransform="uppercase"
                          noOfLines={2}
                          color={active ? 'purple.100' : 'gray.600'}
                        >
                          {post.title}
                        </Heading>
                      </span>
                    </HStack>
                  </Link>
                );
              })}
            </Box>
          </Box>
        </Flex>
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
