import { type GridItemProps } from '@junhoyeo/iphone';

export const INSTALLED_APPS: (GridItemProps & { id: string })[] = [
  {
    name: '$IBCX',
    icon: '/assets/phone/icons/grid/ibcx.jpeg',
    color: '#080e2a',
    id: 'ibcx',
  },
  {
    name: 'Bento',
    icon: '/assets/phone/icons/grid/bento.jpg',
    color: '#ff79b4',
    id: 'bento',
  },
  {
    name: 'ZEP Studio',
    icon: '/assets/phone/icons/grid/zep-studio.png',
    color: '#4d3ee9',
    id: 'zep-studio',
  },
  {
    name: 'Alphaworks',
    icon: '/assets/phone/icons/grid/alphaworks.png',
    color: '#FFFB00',
    id: 'alphaworks',
  },
  {
    name: 'Keplr',
    icon: '/assets/phone/icons/grid/keplr.png',
    color: '#00C3F8',
    id: 'keplr',
  },
  {
    name: 'Pylon Protocol',
    icon: '/assets/phone/icons/grid/pylon-protocol.png',
    color: '#032845',
    id: 'pylon-protocol',
  },
  {
    name: 'Toss',
    icon: '/assets/phone/icons/grid/toss.webp',
    color: '#ffffff',
    id: 'toss',
  },
  {
    name: 'PocketLesson',
    icon: '/assets/phone/icons/grid/pocketlesson.png',
    color: '#4b66f9',
    id: 'pocketlesson',
  },
  {
    name: 'GitHub',
    icon: '/assets/phone/icons/grid/github.webp',
    color: '#1b2023',
    notifications: 3,
    id: 'github',
  },
];
