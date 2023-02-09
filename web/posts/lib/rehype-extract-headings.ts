/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-explicit-any */

import Slugger from 'github-slugger';
import { headingRank } from 'hast-util-heading-rank';
import { visit } from 'unist-util-visit';

import { transformSlug } from './rehype-transform-slug';

type Node =
  | {
      type: 'element';
      tagName: string;
      properties: any;
      children: Node[];
      position: {
        start: { line: number; column: number; offset: number };
        end: { line: number; column: number; offset: number };
      };
    }
  | {
      type: 'text';
      value: string;
      position: {
        start: { line: number; column: number; offset: number };
        end: { line: number; column: number; offset: number };
      };
    };

export type Heading = {
  id: string;
  title: string;
  rank: number;
};

const slugger = new Slugger();

export const rehypeExtractHeadings = ({
  headings,
}: {
  rank: number;
  headings: Heading[];
}) => {
  return (tree: any) => {
    slugger.reset();

    visit(tree, 'element', (node: Node) => {
      const rank = headingRank(node);
      if (node.type === 'element' && !!rank) {
        const title =
          node.children[0]?.type === 'text' ? node.children[0].value : '';
        headings.push({
          id: transformSlug(slugger, node),
          title,
          rank,
        });
      }
    });
  };
};
