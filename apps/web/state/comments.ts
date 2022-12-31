import { atom } from 'jotai';

import { type UserComment } from '@/components/UserCommentCard';

export const isCommentDrawerOpenAtom = atom<boolean>(false);

export const commentsAtom = atom<UserComment[]>([]);
