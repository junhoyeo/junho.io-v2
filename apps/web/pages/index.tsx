import styled from '@emotion/styled';
import {
  Avatar,
  Breadcrumbs,
  Card,
  Description,
  Text,
  useTheme,
} from '@geist-ui/core';
import { Info } from '@geist-ui/icons';
import getXPath from 'get-xpath';
import { type NextPage } from 'next';
import { useEffect, useState } from 'react';
import { type Descendant, Editor, Node, Transforms, createEditor } from 'slate';
import { Editable, ReactEditor, Slate, withReact } from 'slate-react';
import { v4 as uuidv4 } from 'uuid';

import { Layout } from '../components/Layout';
import {
  type UserComment,
  UserCommentCard,
} from '../components/UserCommentCard';
import { Header } from '../home/Header';

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

  const [comments, setComments] = useState<UserComment[]>([]);
  const [positionDraft, setPositionDraft] = useState<PositionDraft | null>(
    null,
  );

  useEffect(() => {
    const handleClick = (event: MouseEvent): void => {
      const element = event.target;

      if (element instanceof HTMLElement) {
        const draft = element.closest('.draft');
        if (draft) {
          return;
        }

        const xpath = getXPath(element);
        const x = event.clientX + window.pageXOffset;
        const y = event.clientY + window.pageYOffset;
        setPositionDraft({ x, y, xpath });

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
                    <Description
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
      leftContent={<div />}
      rightContent={
        <>
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
        </>
      }
    >
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
`;
