import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { useMemo } from 'react';

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-US');

export const useTimeAgo = (date: Date): string => {
  return useMemo(() => timeAgo.format(date), [date]);
};
