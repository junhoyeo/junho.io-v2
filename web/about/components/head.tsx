import NextHead from 'next/head';

export type Meta = {
  title: string;
  description: string;
  image: string;
  url: string;
};
export const defaultMeta: Meta = {
  title: "Hello, I'm Junho Yeo.",
  description: '20-yo Generalist Hacker, shaping the 2nd/3rd web.',
  image: 'https://junho.io/assets/og-image-v2.jpg',
  url: 'https://junho.io',
};
type HeadProps = { meta?: Meta };

export const Head: React.FC<HeadProps> = ({ meta = defaultMeta }) => {
  return (
    <NextHead>
      <title>{meta.title}</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      />

      <meta name="title" content={meta.title} />
      <meta name="description" content={meta.description} />
      <link
        rel="icon"
        href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏴‍☠️</text></svg>"
      />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={meta.url} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:image" content={meta.image} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={meta.url} />
      <meta property="twitter:title" content={meta.title} />
      <meta property="twitter:description" content={meta.description} />
      <meta property="twitter:image" content={meta.image} />
      <meta name="theme-color" content="#000" />
    </NextHead>
  );
};
