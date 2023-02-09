import { atom } from 'jotai';

import { type UserComment } from '@/components/UserCommentCard';

export const isCommentDrawerOpenAtom = atom<boolean>(false);

export type PositionDraft = {
  x: number;
  y: number;
  xpath: string;
};

export const commentsAtom = atom<UserComment[]>([]);
export const positionDraftAtom = atom<PositionDraft | null>(null);
