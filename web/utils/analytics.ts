/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable prefer-const */
/* eslint-disable no-nested-ternary */
const isBrowser = typeof window !== 'undefined';

type AnalyticsEvent = {
  view_landing: undefined;
  view_landing_section: {
    section: string;
  };
  click_inline_link: {
    title: string;
  };
  click_social_link: {
    name: string;
    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
    medium?: 'home_header' | 'home_footer' | string;
  };
  click_icon: {
    name: string;
  };
  view_blog_list: undefined;
  view_blog_post: {
    title: string;
    slug: string;
  };
};

const AMPLITUDE_API_KEY = 'bed3d63c77b5d219d3d9085336c4f698';
const getEnvironment = () => {
  if (!isBrowser) {
    return '';
  }
  return window.location.host.includes('localhost')
    ? 'debug'
    : window.location.host.includes('junho.io')
    ? 'production'
    : 'development';
};

async function getAmplitude() {
  if (isBrowser) {
    const amplitude = await import('amplitude-js');
    return amplitude.default.getInstance();
  }
  return undefined;
}

let initialized = false;
async function initialize() {
  if (initialized) {
    return;
  }
  const amplitude = await getAmplitude();
  amplitude?.init(AMPLITUDE_API_KEY);
  const ENVIRONMENT = getEnvironment();
  amplitude?.setUserProperties({
    is_debug: ENVIRONMENT !== 'production',
  });
}

async function logEvent<TName extends keyof AnalyticsEvent>(
  name: TName,
  properties: AnalyticsEvent[TName],
) {
  if (!initialized) {
    await initialize();
  }
  const eventProperties = {
    referrer: document.referrer || undefined,
    ...(properties as unknown as object),
  };
  const ENVIRONMENT = getEnvironment();
  if (ENVIRONMENT !== 'production') {
    console.log('[Analytics]', name, eventProperties);
  }
  const amplitude = await getAmplitude();
  amplitude?.logEvent(name, eventProperties);
}

export const Analytics = {
  getAmplitude,
  initialize,
  logEvent,
};
