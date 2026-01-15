import type { GetServerSideProps } from 'next';

export default function AboutPage() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/',
      permanent: true,
    },
  };
};
