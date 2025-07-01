import styled from '@emotion/styled';
import { useAtom } from 'jotai';
import type { BaseEditor } from 'slate';
import { Editor, Node, Transforms, type Descendant } from 'slate';
import type { ReactEditor } from 'slate-react';
import { Editable, Slate } from 'slate-react';
import { v4 as uuidv4 } from 'uuid';

import { commentsAtom, positionDraftAtom } from '@/state/comments';
import { fixedWidth } from '@/utils/css';
import { colors } from '@/styles/colors';

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

const INITIAL_EDITOR_NODES = [{ type: 'paragraph', children: [{ text: '' }] }];

type CommentAreaProps = {
  editor: BaseEditor & ReactEditor;
  onReset?: () => void;
};
export const CommentArea: React.FC<CommentAreaProps> = ({
  editor,
  onReset,
}) => {
  const [comments, setComments] = useAtom(commentsAtom);
  const [positionDraft, setPositionDraft] = useAtom(positionDraftAtom);

  return (
    <Slate editor={editor} value={INITIAL_EDITOR_NODES}>
      <BubbleList>
        {comments.map((comment) => (
          <BubbleItem
            key={comment.uuid}
            style={{
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
            <BubbleItem>
              <Avatar src={MOCKED_USER.avatarURL} />
            </BubbleItem>
            <EditorCard>
              <EditorTitle>Leave a comment</EditorTitle>
              <Editable
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
                onKeyDown={(event): void => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    const comment = serializeDescendants(editor.children);

                    const newComment = {
                      uuid: uuidv4(),
                      createdAt: MOCKED_CREATED_AT,
                      user: MOCKED_USER,
                      comment,
                      position: positionDraft,
                    };
                    setComments((prev) => [...prev, newComment]);
                    setPositionDraft(null);
                    onReset?.();
                    resetNodes(editor, INITIAL_EDITOR_NODES);
                  }
                }}
                placeholder="Start a new thread"
              />
            </EditorCard>
          </UserCommentEditorContainer>
        )}
      </BubbleList>
    </Slate>
  );
};

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
  background-color: ${colors.cyan};

  && > span {
    border: 0;
    background-color: transparent;

    & > img {
      background-color: black;
    }
  }
`;

const Avatar = styled.img<{ src: string }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserCommentEditorContainer = styled.div`
  position: absolute;
  display: flex;
  pointer-events: auto;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 4px;
`;

const EditorCard = styled.div`
  ${fixedWidth(300)}

  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  background-color: ${colors.accents_1};
  border: 1px solid ${colors.accents_2};
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease, border 0s;
`;

const EditorTitle = styled.h4`
  margin: 0;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 600;
  color: ${colors.accents_7};
`;
