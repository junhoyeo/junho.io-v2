import { useEffect, useRef } from 'react';

const UtterancesConfig = {
  src: 'https://utteranc.es/client.js',
  repo: 'junhoyeo/paracosm',
  'issue-term': 'title',
  label: '✨💬✨ comments',
  theme: 'dark-blue',
  crossorigin: 'anonymous',
  async: true,
};

export const Comments: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    // to bypass double-rendering in strict mode
    if (isRenderedRef.current) {
      return;
    }
    isRenderedRef.current = true;

    const scriptElement = document.createElement('script');
    scriptElement.async = true;
    scriptElement.crossOrigin = 'anonymous';
    scriptElement.src = 'https://utteranc.es/client.js';

    Object.entries(UtterancesConfig).forEach(([key, value]) => {
      scriptElement.setAttribute(key, value.toString());
    });

    ref.current?.appendChild(scriptElement);
  }, []);

  return <div ref={ref} />;
};
