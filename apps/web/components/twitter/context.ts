import { createContext } from 'react';

import type { TweetData } from './types';

export const TweetsContext = createContext<Record<string, TweetData>>({});
