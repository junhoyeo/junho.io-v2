/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import Slugger from 'github-slugger';
import { hasProperty } from 'hast-util-has-property';
import { headingRank } from 'hast-util-heading-rank';
import { toString } from 'hast-util-to-string';
import { visit } from 'unist-util-visit';

const slugger = new Slugger();

export const rehypeTransformSlug = () => {
  return (tree: any) => {
    slugger.reset();

    visit(tree, 'element', (node) => {
      if (headingRank(node) && node.properties && !hasProperty(node, 'id')) {
        node.properties.id = transformSlug(slugger, node);
      }
    });
  };
};

export const transformSlug = (_slugger: Slugger, node: any) => {
  let extractedId = _slugger.slug(toString(node), false);
  if (extractedId.startsWith('-')) {
    extractedId = extractedId.slice(1);
  }
  if (extractedId.endsWith('-')) {
    extractedId = extractedId.slice(0, -1);
  }
  return extractedId;
};
