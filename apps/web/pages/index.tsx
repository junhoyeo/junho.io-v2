import styled from '@emotion/styled';
import {
  Avatar,
  Card,
  Collapse,
  Description,
  Spacer,
  Text,
  useTheme,
} from '@geist-ui/core';
import { Info } from '@geist-ui/icons';
import getXPath from 'get-xpath';
import { useAtom } from 'jotai';
import { type NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';
import { Editor, Node, Transforms, createEditor, type Descendant } from 'slate';
import { Editable, ReactEditor, Slate, withReact } from 'slate-react';
import { v4 as uuidv4 } from 'uuid';

import { Layout } from '../components/Layout';
import { Header } from '../home/Header';
import { commentsAtom } from '../state/comments';

const serializeDescendants = (descendants: Descendant[]): string =>
  descendants.map((n) => Node.string(n)).join('\n');

const resetNodes = (editor: Editor, defaultNodes: Node | Node[]): void => {
  const children = [...editor.children];
  children.forEach((node) =>
    editor.apply({ type: 'remove_node', path: [0], node }),
  );

  const nodes = Node.isNode(defaultNodes) ? [defaultNodes] : defaultNodes;
  nodes.forEach((node, i) =>
    editor.apply({ type: 'insert_node', path: [i], node }),
  );

  const point = Editor.end(editor, []);
  Transforms.select(editor, point);
};

const MOCKED_CREATED_AT = new Date();
const MOCKED_USER = {
  displayName: 'Junho Yeo',
  avatarURL: 'https://github.com/junhoyeo.png',
};

type PositionDraft = {
  x: number;
  y: number;
  xpath: string;
};

const INITIAL_EDITOR_NODES = [{ type: 'paragraph', children: [{ text: '' }] }];

const HomePage: NextPage = () => {
  const { palette } = useTheme();

  // eslint-disable-next-line react/hook-use-state
  const [editor] = useState(() => withReact(createEditor()));

  const [comments, setComments] = useAtom(commentsAtom);
  const [positionDraft, setPositionDraft] = useState<PositionDraft | null>(
    null,
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const hasPositionDraftRef = useRef<boolean>(false);

  useEffect(() => {
    const handleClick = (event: MouseEvent): void => {
      const element = event.target;

      if (element instanceof HTMLElement) {
        const draft = element.closest('.draft');
        if (draft) {
          return;
        }

        if (hasPositionDraftRef.current) {
          setPositionDraft(null);
          hasPositionDraftRef.current = false;
          return;
        }

        const hasValidAncestor = element.closest('.page-container');
        if (!hasValidAncestor) {
          return;
        }

        const xpath = getXPath(element);

        const rect = containerRef.current?.getBoundingClientRect();
        const x =
          event.clientX -
          (rect?.left || 0) +
          (containerRef.current?.offsetLeft || 0);
        const y =
          event.clientY -
          (rect?.top || 0) +
          (containerRef.current?.offsetTop || 0);

        setPositionDraft({ x, y, xpath });
        hasPositionDraftRef.current = true;

        setTimeout(() => {
          ReactEditor.focus(editor);
        });
      }
    };
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [editor]);

  return (
    <Layout
      containerRef={containerRef}
      header={
        <>
          <Header />
          <Slate editor={editor} value={INITIAL_EDITOR_NODES}>
            <BubbleList>
              {comments.map((comment) => (
                <BubbleItem
                  key={comment.uuid}
                  style={{
                    backgroundColor: palette.cyan,
                    position: 'absolute',
                    top: comment.position.y,
                    left: comment.position.x,
                  }}
                >
                  <Avatar src={comment.user.avatarURL} />
                </BubbleItem>
              ))}

              {!!positionDraft && (
                <UserCommentEditorContainer
                  className="draft"
                  style={{
                    top: positionDraft.y,
                    left: positionDraft.x,
                  }}
                >
                  <BubbleItem
                    style={{
                      backgroundColor: palette.cyan,
                    }}
                  >
                    <Avatar src={MOCKED_USER.avatarURL} />
                  </BubbleItem>
                  <EditorContainer shadow>
                    <EditorDescription
                      title="Leave a comment"
                      // eslint-disable-next-line react/jsx-sort-props
                      content={
                        <Editable
                          // eslint-disable-next-line jsx-a11y/no-autofocus
                          autoFocus
                          onKeyDown={(event): void => {
                            if (event.key === 'Enter') {
                              event.preventDefault();
                              const comment = serializeDescendants(
                                editor.children,
                              );

                              const newComment = {
                                uuid: uuidv4(),
                                createdAt: MOCKED_CREATED_AT,
                                user: MOCKED_USER,
                                comment,
                                position: positionDraft,
                              };
                              setComments((prev) => [...prev, newComment]);
                              setPositionDraft(null);
                              hasPositionDraftRef.current = false;
                              resetNodes(editor, INITIAL_EDITOR_NODES);
                            }
                          }}
                          placeholder="Start a new thread"
                        />
                      }
                    />
                  </EditorContainer>
                </UserCommentEditorContainer>
              )}
            </BubbleList>
          </Slate>
        </>
      }
    >
      <Spacer h={3} />
      <Text blockquote>
        <InfoIcon size={20} />

        <Text span style={{ color: palette.accents_6 }}>
          A{' '}
          <Text b i span style={{ color: palette.accents_8 }}>
            paracosm
          </Text>{' '}
          is{' '}
          <Text span style={{ color: palette.accents_8 }}>
            a detailed imaginary world
          </Text>{' '}
          having its own geography, history, and language, which may incorporate
          real-world or fictitious characters and conventions.
        </Text>
      </Text>
      <Collapse.Group>
        <Collapse title="Question A">
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Text>
        </Collapse>
        <Collapse title="Question B">
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Text>
        </Collapse>
      </Collapse.Group>{' '}
      <Collapse.Group>
        <Collapse title="Question A">
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Text>
        </Collapse>
        <Collapse title="Question B">
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Text>
        </Collapse>
      </Collapse.Group>
    </Layout>
  );
};

export default HomePage;

const InfoIcon = styled(Info)`
  margin-right: 8px;
  display: inline-block;
  vertical-align: text-bottom;
`;

const BubbleList = styled.div`
  position: absolute;
  pointer-events: none;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
const BubbleItem = styled.div`
  padding: 3px;
  border-radius: 50%;
  cursor: pointer;
  pointer-events: auto;

  && > span {
    border: 0;
    background-color: transparent;

    & > img {
      background-color: black;
    }
  }
`;

const UserCommentEditorContainer = styled.div`
  position: absolute;
  display: flex;
  pointer-events: auto;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 4px;
`;

const EditorContainer = styled(Card)`
  width: 300px;
  min-width: 300px;
  max-width: 300px;

  display: flex;
  flex-direction: column;
  gap: 8px;

  &&& {
    transition: all 0.2s ease, border 0s;
  }
`;
const EditorDescription = styled(Description)`
  && dt {
    margin-bottom: 1rem;
  }
`;
