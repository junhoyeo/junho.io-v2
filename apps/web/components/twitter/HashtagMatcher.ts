import {
  Matcher,
  type ChildrenNode,
  type MatchResponse,
  type Node,
} from 'interweave';
import {
  Hashtag,
  combinePatterns,
  type HashtagMatch,
  type HashtagProps,
} from 'interweave-autolink';
import { createElement } from 'react';

const NON_LATIN = [
  // Chinese
  /[\d_\u4E00-\u9FFF-]+/,
  // Japanese
  /[\d_\u3000-\u30FF-]+/,
  // Korean
  /[\d_\u1100-\u11FF\u3130-\u318F\uA960-\uA97F\uAC00-\uD7FF-]+/,
  // Thai
  /[\d_\u0E00-\u0E7F-]+/,
  // Russian, Ukrainian
  // eslint-disable-next-line no-misleading-character-class
  /[\d_a-z\u0400-\u052F\u1C80-\u1C8F\u2DE0-\u2DFF\uA640-\uA69F-]+/,
  // Latin based
  /[\d_a-z\u0080-\u00FF\u0100-\u017F\u0180-\u024F-]+/,
];

const HASHTAG_PATTERN = combinePatterns(
  [
    /[#$]/,
    combinePatterns(NON_LATIN, {
      capture: true,
      join: '|',
    }),
  ],
  {
    flags: 'i',
  },
);

export class HashtagMatcher extends Matcher<HashtagProps> {
  replaceWith(children: ChildrenNode, props: HashtagProps): Node {
    return createElement(Hashtag, props, children);
  }

  asTag(): string {
    return 'a';
  }

  match(string: string): MatchResponse<HashtagMatch> | null {
    return this.doMatch(string, HASHTAG_PATTERN, (matches) => ({
      hashtag: matches[0] || '',
    }));
  }
}
